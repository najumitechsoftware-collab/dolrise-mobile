export interface User {
  id: number;
  username: string;
  full_name?: string;
  avatar_url?: string | null;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  type: "text" | "voice";
  content?: string | null;
  media_url?: string | null;
  created_at: string;
}

export interface Conversation {
  id: number;
  type: "private" | "group";
  status: "pending" | "active" | "rejected";
  created_by: number;
  created_at: string;
  last_message_at?: string | null;

  creator: User;
  participants: {
    user_id: number;
    user: User;
  }[];

  messages: Message[];
}
