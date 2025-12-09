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
    id: number;
    title: string;
    description?: string;
    is_completed: boolean;
    user_id: number;
    priority?: Priority;
    tags?: string; 
    due_date?: string; // ISO format datetime string
    repeat_interval?: RepeatInterval; // Updated to use Enum
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id: number;
    email: string;
}

// Updated AuthResponse to match Better Auth's session structure
export interface AuthResponse {
    token: string; // The JWT token
    user: {
        id: string; // Better Auth user ID is typically a string
        email: string;
    };
    // token_type is implied as 'bearer'
}