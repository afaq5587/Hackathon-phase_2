import { Task, AuthResponse, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

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
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized specifically, e.g., redirect to login
      console.error("Unauthorized API call. Redirecting to login.");
      // You might want to implement a proper redirect here, or clear token
    }
    const errorData = await response.json();
    throw new Error(errorData.detail || `API Error: ${response.statusText}`);
  }

  if (response.status === 204) { // No Content for successful deletes
    return null as T; 
  }
  return response.json();
}

// Authentication
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const response = await fetch(`http://127.0.0.1:8000/token`, { // Use absolute path for /token
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `Login failed: ${response.statusText}`);
  }
  return response.json();
}

export async function registerUser(email: string, password: string): Promise<User> {
    const response = await fetch(`http://127.0.0.1:8000/register`, { // Use absolute path for /register
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Registration failed: ${response.statusText}`);
    }
    return response.json();
}

// Task CRUD Operations
export async function fetchTasks(token: string): Promise<Task[]> {
  return callApi<Task[]>('/tasks/', 'GET', token);
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