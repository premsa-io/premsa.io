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

// Type helper for Supabase queries
export type Tables = {
  notification_preferences: NotificationPreferences;
};