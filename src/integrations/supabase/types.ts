export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_history: {
        Row: {
          created_at: string
          id: string
          model: string | null
          prompt: string
          response: string | null
          tokens_used: number | null
          tool: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          model?: string | null
          prompt: string
          response?: string | null
          tokens_used?: number | null
          tool: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          model?: string | null
          prompt?: string
          response?: string | null
          tokens_used?: number | null
          tool?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          progress: number
          status: string
          subject: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          progress?: number
          status?: string
          subject?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          progress?: number
          status?: string
          subject?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dashboard_statistics: {
        Row: {
          created_at: string
          focus_sessions: number
          id: string
          productivity_score: number
          stat_date: string
          study_hours: number
          tasks_completed: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          focus_sessions?: number
          id?: string
          productivity_score?: number
          stat_date?: string
          study_hours?: number
          tasks_completed?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          focus_sessions?: number
          id?: string
          productivity_score?: number
          stat_date?: string
          study_hours?: number
          tasks_completed?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_logs: {
        Row: {
          created_at: string
          id: string
          log_type: string
          logged_at: string
          note: string | null
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          log_type: string
          logged_at?: string
          note?: string | null
          updated_at?: string
          user_id: string
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          log_type?: string
          logged_at?: string
          note?: string | null
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          folder: string | null
          id: string
          is_pinned: boolean
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          folder?: string | null
          id?: string
          is_pinned?: boolean
          tags?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          folder?: string | null
          id?: string
          is_pinned?: boolean
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          degree: string | null
          email: string | null
          full_name: string | null
          id: string
          language: string | null
          phone: string | null
          semester: string | null
          timezone: string | null
          university: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          degree?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          language?: string | null
          phone?: string | null
          semester?: string | null
          timezone?: string | null
          university?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          degree?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          language?: string | null
          phone?: string | null
          semester?: string | null
          timezone?: string | null
          university?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          assignment_id: string | null
          channel: string
          created_at: string
          id: string
          is_completed: boolean
          is_sent: boolean
          message: string | null
          remind_at: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_id?: string | null
          channel?: string
          created_at?: string
          id?: string
          is_completed?: boolean
          is_sent?: boolean
          message?: string | null
          remind_at: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string | null
          channel?: string
          created_at?: string
          id?: string
          is_completed?: boolean
          is_sent?: boolean
          message?: string | null
          remind_at?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      research_projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          sources: Json
          status: string
          summary: string | null
          title: string
          topic: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          sources?: Json
          status?: string
          summary?: string | null
          title: string
          topic?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          sources?: Json
          status?: string
          summary?: string | null
          title?: string
          topic?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          daily_goal_hours: number
          email_notifications: boolean
          id: string
          push_notifications: boolean
          study_reminders: boolean
          theme: string
          updated_at: string
          user_id: string
          whatsapp_notifications: boolean
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          daily_goal_hours?: number
          email_notifications?: boolean
          id?: string
          push_notifications?: boolean
          study_reminders?: boolean
          theme?: string
          updated_at?: string
          user_id: string
          whatsapp_notifications?: boolean
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          daily_goal_hours?: number
          email_notifications?: boolean
          id?: string
          push_notifications?: boolean
          study_reminders?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
          whatsapp_notifications?: boolean
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      study_plans: {
        Row: {
          created_at: string
          end_date: string | null
          goal: string | null
          id: string
          schedule: Json
          start_date: string | null
          status: string
          subject: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          goal?: string | null
          id?: string
          schedule?: Json
          start_date?: string | null
          status?: string
          subject?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          goal?: string | null
          id?: string
          schedule?: Json
          start_date?: string | null
          status?: string
          subject?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      uploaded_files: {
        Row: {
          bucket: string
          category: string | null
          created_at: string
          file_name: string
          file_size: number | null
          id: string
          mime_type: string | null
          path: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bucket: string
          category?: string | null
          created_at?: string
          file_name: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          path: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bucket?: string
          category?: string | null
          created_at?: string
          file_name?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          path?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
