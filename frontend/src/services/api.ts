import { Task, AuthResponse, User, Priority } from './types';
import { signIn, signUp } from '../lib/auth-client'; // Import signIn, signUp from auth-client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://betterauth-three.vercel.app/api/v1';

async function callApi<T>(
  endpoint: string,
  method: string,
  token: string,
  body?: any
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include', // Ensure cookies are sent
    body: body ? JSON.stringify(body) : undefined,
  };

  console.log(`API Call: ${method} ${API_BASE_URL}${endpoint}`);
  console.log('Token present:', !!token);
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      console.error("Unauthorized API call. Redirecting to login.");
    }
    const errorData = await response.json();
    throw new Error(errorData.detail || `API Error: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as T; 
  }
  return response.json();
}

// Authentication
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await signIn.email({ email, password });
    
    if (error) throw new Error(error.message);
    if (!data || !data.user) {
        throw new Error("Login failed: No user received.");
    }
    return {
        access_token: data.token || "cookie-session", // Fallback if token is hidden
        token_type: "bearer",
        user: { id: data.user.id, email: data.user.email }
    };
  } catch (error: any) {
    throw new Error(error.message || "Login failed.");
  }
}

export async function registerUser(email: string, password: string): Promise<User> {
    try {
        const { data, error } = await signUp.email({ email, password, name: email.split('@')[0] });
        
        if (error) throw new Error(error.message);
        if (!data || !data.user) {
            throw new Error("Registration failed: No user received.");
        }
        return { id: data.user.id, email: data.user.email };
    } catch (error: any) {
        throw new Error(error.message || "Registration failed.");
    }
}

// Task CRUD Operations
interface FetchTasksParams {
  search?: string;
  is_completed?: boolean | '';
  priority?: Priority | '';
  tag?: string;
  sort_by?: string;
  order?: 'asc' | 'desc';
}

export async function fetchTasks(token: string, params: FetchTasksParams = {}): Promise<Task[]> {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append('search', params.search);
  if (params.is_completed !== '' && params.is_completed !== undefined) queryParams.append('is_completed', String(params.is_completed));
  if (params.priority) queryParams.append('priority', params.priority);
  if (params.tag) queryParams.append('tag', params.tag);
  if (params.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params.order) queryParams.append('order', params.order);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/tasks/?${queryString}` : '/tasks/';
  return callApi<Task[]>(endpoint, 'GET', token);
}

export async function createTask(token: string, taskData: Partial<Task>): Promise<Task> {
  return callApi<Task>('/tasks/', 'POST', token, taskData);
}

export async function updateTask(token: string, taskId: number, taskData: Partial<Task>): Promise<Task> {
  return callApi<Task>(`/tasks/${taskId}`, 'PUT', token, taskData);
}

export async function deleteTask(token: string, taskId: number): Promise<null> {
  return callApi<null>(`/tasks/${taskId}`, 'DELETE', token);
}

export async function toggleTaskCompletion(token: string, taskId: number): Promise<Task> {
  return callApi<Task>(`/tasks/${taskId}/complete`, 'PATCH', token);
}