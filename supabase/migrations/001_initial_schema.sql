create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  role text not null default 'player' check (role in ('player', 'commissioner', 'admin')),
  created_at timestamptz not null default now()
);

create table leagues (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  commissioner_id uuid not null references profiles(id) on delete cascade,
  current_season int not null,
  current_quarter int not null check (current_quarter between 1 and 4),
  status text not null default 'active' check (status in ('active', 'paused', 'archived')),
  created_at timestamptz not null default now()
);

create table wrestlers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  brand text not null check (brand in ('raw', 'smackdown', 'nxt', 'legend', 'free-agent')),
  status text not null default 'active' check (status in ('active', 'injured', 'suspended', 'released')),
  photo_url text,
  created_at timestamptz not null default now()
);

create table rosters (
  id uuid primary key default uuid_generate_v4(),
  league_id uuid not null references leagues(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  season int not null,
  quarter int not null check (quarter between 1 and 4),
  created_at timestamptz not null default now(),
  unique (league_id, user_id, season, quarter)
);

create table roster_wrestlers (
  id uuid primary key default uuid_generate_v4(),
  roster_id uuid not null references rosters(id) on delete cascade,
  wrestler_id uuid not null references wrestlers(id) on delete cascade,
  acquisition_cost numeric(6, 2) not null default 0,
  is_keeper boolean not null default false,
  created_at timestamptz not null default now(),
  unique (roster_id, wrestler_id)
);

create table lineups (
  id uuid primary key default uuid_generate_v4(),
  roster_id uuid not null references rosters(id) on delete cascade,
  week int not null,
  season int not null,
  quarter int not null check (quarter between 1 and 4),
  captain_wrestler_id uuid references wrestlers(id) on delete set null,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (roster_id, week, season, quarter)
);

create table lineup_wrestlers (
  id uuid primary key default uuid_generate_v4(),
  lineup_id uuid not null references lineups(id) on delete cascade,
  wrestler_id uuid not null references wrestlers(id) on delete cascade,
  position text not null check (position in ('starter', 'reserve')),
  priority_order int,
  created_at timestamptz not null default now(),
  unique (lineup_id, wrestler_id)
);

create table shows (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  event_date date not null,
  show_type text not null check (show_type in ('raw', 'smackdown', 'nxt', 'ppv', 'ple')),
  season int not null,
  quarter int not null check (quarter between 1 and 4),
  week int not null,
  created_at timestamptz not null default now()
);

create table matches (
  id uuid primary key default uuid_generate_v4(),
  show_id uuid not null references shows(id) on delete cascade,
  rating numeric(3, 1) not null default 0 check (rating between 0 and 5),
  duration_minutes int not null default 0,
  is_title_match boolean not null default false,
  title_level text check (title_level in ('world', 'midcard', 'tag', 'women', 'other')),
  is_main_event boolean not null default false,
  is_special_stipulation boolean not null default false,
  created_at timestamptz not null default now()
);

create table match_participants (
  id uuid primary key default uuid_generate_v4(),
  match_id uuid not null references matches(id) on delete cascade,
  wrestler_id uuid not null references wrestlers(id) on delete cascade,
  is_winner boolean not null default false,
  victory_type text not null default 'none' check (victory_type in ('pin', 'sub', 'dq', 'co', 'ko', 'no_contest', 'none')),
  bonus_debut boolean not null default false,
  bonus_return boolean not null default false,
  bonus_title_defense boolean not null default false,
  malus_botch boolean not null default false,
  malus_short_match boolean not null default false,
  malus_squash_loss boolean not null default false,
  created_at timestamptz not null default now(),
  unique (match_id, wrestler_id)
);

create table points (
  id uuid primary key default uuid_generate_v4(),
  lineup_id uuid not null references lineups(id) on delete cascade,
  match_id uuid not null references matches(id) on delete cascade,
  wrestler_id uuid not null references wrestlers(id) on delete cascade,
  base_points numeric(6, 2) not null default 0,
  victory_bonus numeric(6, 2) not null default 0,
  context_bonus numeric(6, 2) not null default 0,
  duration_bonus numeric(6, 2) not null default 0,
  narrative_bonus numeric(6, 2) not null default 0,
  malus numeric(6, 2) not null default 0,
  captain_multiplier numeric(4, 2) not null default 1,
  total_points numeric(6, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table draft_bids (
  id uuid primary key default uuid_generate_v4(),
  league_id uuid not null references leagues(id) on delete cascade,
  season int not null,
  quarter int not null check (quarter between 1 and 4),
  wrestler_id uuid not null references wrestlers(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  bid_amount numeric(6, 2) not null,
  is_winning_bid boolean not null default false,
  created_at timestamptz not null default now()
);

create table trades (
  id uuid primary key default uuid_generate_v4(),
  league_id uuid not null references leagues(id) on delete cascade,
  proposer_id uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'cancelled')),
  created_at timestamptz not null default now()
);

create table trade_wrestlers (
  id uuid primary key default uuid_generate_v4(),
  trade_id uuid not null references trades(id) on delete cascade,
  wrestler_id uuid not null references wrestlers(id) on delete cascade,
  from_user_id uuid not null references profiles(id) on delete cascade,
  to_user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table leagues enable row level security;
alter table wrestlers enable row level security;
alter table rosters enable row level security;
alter table roster_wrestlers enable row level security;
alter table lineups enable row level security;
alter table lineup_wrestlers enable row level security;
alter table shows enable row level security;
alter table matches enable row level security;
alter table match_participants enable row level security;
alter table points enable row level security;
alter table draft_bids enable row level security;
alter table trades enable row level security;
alter table trade_wrestlers enable row level security;

create policy "Profiles can view own" on profiles
  for select using (auth.uid() = id);

create policy "Profiles can update own" on profiles
  for update using (auth.uid() = id);

create policy "Profiles can insert own" on profiles
  for insert with check (auth.uid() = id);

create policy "Authenticated can view leagues" on leagues
  for select using (auth.role() = 'authenticated');

create policy "Commissioner can manage leagues" on leagues
  for all using (auth.uid() = commissioner_id) with check (auth.uid() = commissioner_id);

create policy "Authenticated can view wrestlers" on wrestlers
  for select using (auth.role() = 'authenticated');

create policy "Authenticated can view shows" on shows
  for select using (auth.role() = 'authenticated');

create policy "Authenticated can view matches" on matches
  for select using (auth.role() = 'authenticated');

create policy "Authenticated can view participants" on match_participants
  for select using (auth.role() = 'authenticated');

create policy "Roster owners can manage" on rosters
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Roster owners can manage wrestlers" on roster_wrestlers
  for all using (auth.uid() = (select user_id from rosters where rosters.id = roster_id))
  with check (auth.uid() = (select user_id from rosters where rosters.id = roster_id));

create policy "Roster owners can manage lineups" on lineups
  for all using (auth.uid() = (select user_id from rosters where rosters.id = roster_id))
  with check (auth.uid() = (select user_id from rosters where rosters.id = roster_id));

create policy "Roster owners can manage lineup wrestlers" on lineup_wrestlers
  for all using (
    auth.uid() = (select user_id from rosters where rosters.id = (select roster_id from lineups where lineups.id = lineup_id))
  )
  with check (
    auth.uid() = (select user_id from rosters where rosters.id = (select roster_id from lineups where lineups.id = lineup_id))
  );

create policy "Roster owners can view points" on points
  for select using (
    auth.uid() = (select user_id from rosters where rosters.id = (select roster_id from lineups where lineups.id = lineup_id))
  );

create policy "Roster owners can manage bids" on draft_bids
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Trade parties can view" on trades
  for select using (auth.uid() in (proposer_id, receiver_id));

create policy "Trade proposer can manage" on trades
  for all using (auth.uid() = proposer_id) with check (auth.uid() = proposer_id);

create policy "Trade parties can view wrestlers" on trade_wrestlers
  for select using (
    auth.uid() in (from_user_id, to_user_id)
  );

create policy "Trade proposer can manage wrestlers" on trade_wrestlers
  for all using (
    auth.uid() = (select proposer_id from trades where trades.id = trade_id)
  )
  with check (
    auth.uid() = (select proposer_id from trades where trades.id = trade_id)
  );
