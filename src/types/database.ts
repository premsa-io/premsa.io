// Extended database types for tables not yet synced to auto-generated types

export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_alerts: boolean;
  urgent_alerts: boolean;
  daily_digest: boolean;
  weekly_summary: boolean;
  product_updates: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferencesInsert {
  user_id: string;
  email_alerts?: boolean;
  urgent_alerts?: boolean;
  daily_digest?: boolean;
  weekly_summary?: boolean;
  product_updates?: boolean;
  updated_at?: string;
}

// Team invitations
export interface TeamInvitation {
  id: string;
  account_id: string;
  email: string;
  role: string;
  invited_by: string;
  token: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
}

export interface TeamInvitationInsert {
  account_id: string;
  email: string;
  role: string;
  invited_by: string;
  token?: string;
  expires_at?: string;
  status?: string;
}

// Team members from user_profiles
export interface TeamMember {
  id: string;
  full_name: string | null;
  role: string;
  account_id: string;
  email?: string;
  last_sign_in_at?: string | null;
  is_current_user?: boolean;
}

// Type helper for Supabase queries
export type Tables = {
  notification_preferences: NotificationPreferences;
  team_invitations: TeamInvitation;
};