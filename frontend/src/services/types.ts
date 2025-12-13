export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export enum RepeatInterval {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly'
}

export interface Task {
    id: number; // Task ID is likely still auto-inc int, check backend model
    title: string;
    description?: string;
    is_completed: boolean;
    user_id: string; // Changed to string
    priority?: Priority;
    tags?: string; 
    due_date?: string; // ISO format datetime string
    repeat_interval?: RepeatInterval; // Updated to use Enum
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id: string; // Changed to string
    email: string;
}

// Updated AuthResponse to match Better Auth's session structure
// Updated AuthResponse to match API return type
export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: {
        id: string; 
        email: string;
    };
}