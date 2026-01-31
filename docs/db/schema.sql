-- FantaWWE Supabase schema (MVP)
create type user_role as enum ('player', 'admin');
create type league_status as enum ('draft', 'active', 'extension', 'trade_window', 'completed');
create type brand as enum ('raw', 'smackdown', 'nxt');
create type wrestler_status as enum ('active', 'injured', 'released');
create type show_type as enum ('raw', 'smackdown', 'nxt', 'ple');
create type title_level as enum ('world', 'other');
create type victory_type as enum ('pin', 'submission', 'ko', 'dq', 'countout', 'no_contest');
create type lineup_position as enum ('starter', 'reserve');
create type trade_status as enum ('pending', 'accepted', 'rejected', 'vetoed');

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  username text unique not null,
  role user_role not null default 'player',
  created_at timestamp with time zone default now()
);

create table leagues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  commissioner_id uuid references users(id),
  current_season int not null default 1,
  current_quarter int not null default 1,
  status league_status not null default 'draft',
  created_at timestamp with time zone default now()
);

create table wrestlers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand brand not null,
  status wrestler_status not null default 'active',
  photo_url text,
  created_at timestamp with time zone default now()
);

create table rosters (
  id uuid primary key default gen_random_uuid(),
  league_id uuid references leagues(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  season int not null,
  quarter int not null,
  created_at timestamp with time zone default now()
);

create table roster_wrestlers (
  id uuid primary key default gen_random_uuid(),
  roster_id uuid references rosters(id) on delete cascade,
  wrestler_id uuid references wrestlers(id) on delete cascade,
  acquisition_cost numeric not null,
  is_keeper boolean not null default false,
  acquired_at timestamp with time zone default now()
);

create table lineups (
  id uuid primary key default gen_random_uuid(),
  roster_id uuid references rosters(id) on delete cascade,
  week int not null,
  season int not null,
  quarter int not null,
  captain_wrestler_id uuid references wrestlers(id),
  locked_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

create table lineup_wrestlers (
  id uuid primary key default gen_random_uuid(),
  lineup_id uuid references lineups(id) on delete cascade,
  wrestler_id uuid references wrestlers(id) on delete cascade,
  position lineup_position not null,
  priority_order int,
  created_at timestamp with time zone default now()
);

create table shows (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_date date not null,
  show_type show_type not null,
  season int not null,
  quarter int not null,
  week int not null,
  created_at timestamp with time zone default now()
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  show_id uuid references shows(id) on delete cascade,
  rating numeric not null,
  duration_minutes int not null,
  is_title_match boolean not null default false,
  title_level title_level,
  is_main_event boolean not null default false,
  is_special_stipulation boolean not null default false,
  created_at timestamp with time zone default now()
);

create table match_participants (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete cascade,
  wrestler_id uuid references wrestlers(id) on delete cascade,
  is_winner boolean not null default false,
  victory_type victory_type,
  has_debut_bonus boolean not null default false,
  has_title_defense_bonus boolean not null default false,
  has_botch_malus boolean not null default false,
  has_short_match_malus boolean not null default false,
  has_squash_loss_malus boolean not null default false,
  created_at timestamp with time zone default now()
);

create table points (
  id uuid primary key default gen_random_uuid(),
  lineup_id uuid references lineups(id) on delete cascade,
  match_id uuid references matches(id) on delete cascade,
  wrestler_id uuid references wrestlers(id) on delete cascade,
  base_points numeric not null,
  victory_bonus numeric not null,
  context_bonus numeric not null,
  duration_bonus numeric not null,
  narrative_bonus numeric not null,
  malus numeric not null,
  captain_multiplier numeric not null,
  total_points numeric not null,
  created_at timestamp with time zone default now()
);

create table draft_bids (
  id uuid primary key default gen_random_uuid(),
  league_id uuid references leagues(id) on delete cascade,
  season int not null,
  quarter int not null,
  wrestler_id uuid references wrestlers(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  bid_amount numeric not null,
  is_winning_bid boolean not null default false,
  created_at timestamp with time zone default now()
);

create table trades (
  id uuid primary key default gen_random_uuid(),
  league_id uuid references leagues(id) on delete cascade,
  proposer_id uuid references users(id) on delete cascade,
  receiver_id uuid references users(id) on delete cascade,
  status trade_status not null default 'pending',
  proposed_at timestamp with time zone default now(),
  resolved_at timestamp with time zone
);

create table trade_wrestlers (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid references trades(id) on delete cascade,
  wrestler_id uuid references wrestlers(id) on delete cascade,
  from_user_id uuid references users(id) on delete cascade,
  to_user_id uuid references users(id) on delete cascade
);
