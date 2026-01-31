export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          role: "player" | "commissioner" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          role?: "player" | "commissioner" | "admin";
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          role?: "player" | "commissioner" | "admin";
          created_at?: string;
        };
      };
      leagues: {
        Row: {
          id: string;
          name: string;
          commissioner_id: string;
          current_season: number;
          current_quarter: number;
          status: "active" | "paused" | "archived";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          commissioner_id: string;
          current_season: number;
          current_quarter: number;
          status?: "active" | "paused" | "archived";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          commissioner_id?: string;
          current_season?: number;
          current_quarter?: number;
          status?: "active" | "paused" | "archived";
          created_at?: string;
        };
      };
      wrestlers: {
        Row: {
          id: string;
          name: string;
          brand: "raw" | "smackdown" | "nxt" | "legend" | "free-agent";
          status: "active" | "injured" | "suspended" | "released";
          photo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand: "raw" | "smackdown" | "nxt" | "legend" | "free-agent";
          status?: "active" | "injured" | "suspended" | "released";
          photo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand?: "raw" | "smackdown" | "nxt" | "legend" | "free-agent";
          status?: "active" | "injured" | "suspended" | "released";
          photo_url?: string | null;
          created_at?: string;
        };
      };
      rosters: {
        Row: {
          id: string;
          league_id: string;
          user_id: string;
          season: number;
          quarter: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          league_id: string;
          user_id: string;
          season: number;
          quarter: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          league_id?: string;
          user_id?: string;
          season?: number;
          quarter?: number;
          created_at?: string;
        };
      };
      roster_wrestlers: {
        Row: {
          id: string;
          roster_id: string;
          wrestler_id: string;
          acquisition_cost: number;
          is_keeper: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          roster_id: string;
          wrestler_id: string;
          acquisition_cost?: number;
          is_keeper?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          roster_id?: string;
          wrestler_id?: string;
          acquisition_cost?: number;
          is_keeper?: boolean;
          created_at?: string;
        };
      };
      lineups: {
        Row: {
          id: string;
          roster_id: string;
          week: number;
          season: number;
          quarter: number;
          captain_wrestler_id: string | null;
          locked_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          roster_id: string;
          week: number;
          season: number;
          quarter: number;
          captain_wrestler_id?: string | null;
          locked_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          roster_id?: string;
          week?: number;
          season?: number;
          quarter?: number;
          captain_wrestler_id?: string | null;
          locked_at?: string | null;
          created_at?: string;
        };
      };
      lineup_wrestlers: {
        Row: {
          id: string;
          lineup_id: string;
          wrestler_id: string;
          position: "starter" | "reserve";
          priority_order: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lineup_id: string;
          wrestler_id: string;
          position: "starter" | "reserve";
          priority_order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lineup_id?: string;
          wrestler_id?: string;
          position?: "starter" | "reserve";
          priority_order?: number | null;
          created_at?: string;
        };
      };
      shows: {
        Row: {
          id: string;
          name: string;
          event_date: string;
          show_type: "raw" | "smackdown" | "nxt" | "ppv" | "ple";
          season: number;
          quarter: number;
          week: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          event_date: string;
          show_type: "raw" | "smackdown" | "nxt" | "ppv" | "ple";
          season: number;
          quarter: number;
          week: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          event_date?: string;
          show_type?: "raw" | "smackdown" | "nxt" | "ppv" | "ple";
          season?: number;
          quarter?: number;
          week?: number;
          created_at?: string;
        };
      };
      matches: {
        Row: {
          id: string;
          show_id: string;
          rating: number;
          duration_minutes: number;
          is_title_match: boolean;
          title_level: "world" | "midcard" | "tag" | "women" | "other" | null;
          is_main_event: boolean;
          is_special_stipulation: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          show_id: string;
          rating?: number;
          duration_minutes?: number;
          is_title_match?: boolean;
          title_level?: "world" | "midcard" | "tag" | "women" | "other" | null;
          is_main_event?: boolean;
          is_special_stipulation?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          show_id?: string;
          rating?: number;
          duration_minutes?: number;
          is_title_match?: boolean;
          title_level?: "world" | "midcard" | "tag" | "women" | "other" | null;
          is_main_event?: boolean;
          is_special_stipulation?: boolean;
          created_at?: string;
        };
      };
      match_participants: {
        Row: {
          id: string;
          match_id: string;
          wrestler_id: string;
          is_winner: boolean;
          victory_type:
            | "pin"
            | "sub"
            | "dq"
            | "co"
            | "ko"
            | "no_contest"
            | "none";
          bonus_debut: boolean;
          bonus_return: boolean;
          bonus_title_defense: boolean;
          malus_botch: boolean;
          malus_short_match: boolean;
          malus_squash_loss: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          match_id: string;
          wrestler_id: string;
          is_winner?: boolean;
          victory_type?:
            | "pin"
            | "sub"
            | "dq"
            | "co"
            | "ko"
            | "no_contest"
            | "none";
          bonus_debut?: boolean;
          bonus_return?: boolean;
          bonus_title_defense?: boolean;
          malus_botch?: boolean;
          malus_short_match?: boolean;
          malus_squash_loss?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          match_id?: string;
          wrestler_id?: string;
          is_winner?: boolean;
          victory_type?:
            | "pin"
            | "sub"
            | "dq"
            | "co"
            | "ko"
            | "no_contest"
            | "none";
          bonus_debut?: boolean;
          bonus_return?: boolean;
          bonus_title_defense?: boolean;
          malus_botch?: boolean;
          malus_short_match?: boolean;
          malus_squash_loss?: boolean;
          created_at?: string;
        };
      };
      points: {
        Row: {
          id: string;
          lineup_id: string;
          match_id: string;
          wrestler_id: string;
          base_points: number;
          victory_bonus: number;
          context_bonus: number;
          duration_bonus: number;
          narrative_bonus: number;
          malus: number;
          captain_multiplier: number;
          total_points: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          lineup_id: string;
          match_id: string;
          wrestler_id: string;
          base_points?: number;
          victory_bonus?: number;
          context_bonus?: number;
          duration_bonus?: number;
          narrative_bonus?: number;
          malus?: number;
          captain_multiplier?: number;
          total_points?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          lineup_id?: string;
          match_id?: string;
          wrestler_id?: string;
          base_points?: number;
          victory_bonus?: number;
          context_bonus?: number;
          duration_bonus?: number;
          narrative_bonus?: number;
          malus?: number;
          captain_multiplier?: number;
          total_points?: number;
          created_at?: string;
        };
      };
      draft_bids: {
        Row: {
          id: string;
          league_id: string;
          season: number;
          quarter: number;
          wrestler_id: string;
          user_id: string;
          bid_amount: number;
          is_winning_bid: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          league_id: string;
          season: number;
          quarter: number;
          wrestler_id: string;
          user_id: string;
          bid_amount: number;
          is_winning_bid?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          league_id?: string;
          season?: number;
          quarter?: number;
          wrestler_id?: string;
          user_id?: string;
          bid_amount?: number;
          is_winning_bid?: boolean;
          created_at?: string;
        };
      };
      trades: {
        Row: {
          id: string;
          league_id: string;
          proposer_id: string;
          receiver_id: string;
          status: "pending" | "accepted" | "rejected" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          league_id: string;
          proposer_id: string;
          receiver_id: string;
          status?: "pending" | "accepted" | "rejected" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          league_id?: string;
          proposer_id?: string;
          receiver_id?: string;
          status?: "pending" | "accepted" | "rejected" | "cancelled";
          created_at?: string;
        };
      };
      trade_wrestlers: {
        Row: {
          id: string;
          trade_id: string;
          wrestler_id: string;
          from_user_id: string;
          to_user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          trade_id: string;
          wrestler_id: string;
          from_user_id: string;
          to_user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          trade_id?: string;
          wrestler_id?: string;
          from_user_id?: string;
          to_user_id?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
