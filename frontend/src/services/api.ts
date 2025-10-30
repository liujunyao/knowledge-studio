/**
 * API Client for Knowledge Studio Backend
 */

// 类型定义
export interface ModelInfo {
  provider: string;
  model_id: string;
  display_name: string;
  available: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  model_provider: string;
  model_name: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  has_knowledge?: boolean;
  messages?: Message[];
  temperature?: number;
  system_prompt?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
}

export interface SendMessageResponse {
  user_message: Message;
  assistant_message: Message;
}

export interface CreateConversationRequest {
  title: string;
  model_provider: string;
  model_name: string;
  project_id?: string;
}

export interface CreateMessageRequest {
  role: string;
  content: string;
}

// Settings types
export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  model_id: string;
  base_url?: string;
  default_temperature: string;
  default_max_tokens?: string;
  extra_params?: Record<string, any>;
  is_active: boolean;
  is_default: boolean;
  has_api_key: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateModelConfigRequest {
  name: string;
  provider: string;
  model_id: string;
  api_key?: string;
  base_url?: string;
  default_temperature?: string;
  default_max_tokens?: string;
  extra_params?: Record<string, any>;
  is_default?: boolean;
  is_active?: boolean;
}

export interface UpdateModelConfigRequest {
  name?: string;
  api_key?: string;
  base_url?: string;
  default_temperature?: string;
  default_max_tokens?: string;
  extra_params?: Record<string, any>;
  is_active?: boolean;
  is_default?: boolean;
}

export interface AppSetting {
  id: string;
  key: string;
  value?: string;
  value_type: string;
  category: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppSettingRequest {
  key: string;
  value?: string;
  value_type?: string;
  category?: string;
  description?: string;
}

export interface UpdateAppSettingRequest {
  value?: string;
  description?: string;
}

export interface APIKeyStatus {
  provider: string;
  is_valid: boolean;
  last_validated?: string;
  has_key: boolean;
}

export interface KnowledgeSpace {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSpaceRequest {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateSpaceRequest {
  name?: string;
  description?: string;
  color?: string;
}
// API 基础 URL
const getBaseUrl = (): string => {
  // 在 Electron 环境中使用 electronAPI
  if (typeof window !== 'undefined' && (window as any).electronAPI) {
    return 'http://127.0.0.1:13560';
  }
  // Web 环境中使用环境变量或默认值
  return import.meta.env.VITE_API_URL || 'http://localhost:13560';
};

// API 请求封装
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getBaseUrl();
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Models API
  async listModels(): Promise<ModelInfo[]> {
    return this.request<ModelInfo[]>('/api/models/');
  }

  // Conversations API
  async createConversation(data: CreateConversationRequest): Promise<Conversation> {
    return this.request<Conversation>('/api/conversations/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listConversations(skip = 0, limit = 50): Promise<Conversation[]> {
    return this.request<Conversation[]>(`/api/conversations/?skip=${skip}&limit=${limit}`);
  }

  async getConversation(conversationId: string): Promise<Conversation> {
    return this.request<Conversation>(`/api/conversations/${conversationId}`);
  }

  async deleteConversation(conversationId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/conversations/${conversationId}`, {
      method: 'DELETE',
    });
  }

  // Messages API
  async addMessage(
    conversationId: string,
    data: CreateMessageRequest
  ): Promise<Message> {
    return this.request<Message>(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.request<Message[]>(`/api/conversations/${conversationId}/messages`);
  }

  // Send message and get AI response
  async sendMessage(
    conversationId: string,
    data: CreateMessageRequest
  ): Promise<SendMessageResponse> {
    return this.request<SendMessageResponse>(`/api/chat/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck(): Promise<{ message: string; version: string; status: string }> {
    return this.request('/');
  }

  // ========== Settings API ==========

  // Model Configs
  async createModelConfig(data: CreateModelConfigRequest): Promise<ModelConfig> {
    return this.request<ModelConfig>('/api/settings/models', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listModelConfigs(provider?: string, isActive?: boolean): Promise<ModelConfig[]> {
    const params = new URLSearchParams();
    if (provider) params.append('provider', provider);
    if (isActive !== undefined) params.append('is_active', String(isActive));

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<ModelConfig[]>(`/api/settings/models${query}`);
  }

  async getModelConfig(configId: string): Promise<ModelConfig> {
    return this.request<ModelConfig>(`/api/settings/models/${configId}`);
  }

  async updateModelConfig(
    configId: string,
    data: UpdateModelConfigRequest
  ): Promise<ModelConfig> {
    return this.request<ModelConfig>(`/api/settings/models/${configId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteModelConfig(configId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/settings/models/${configId}`, {
      method: 'DELETE',
    });
  }

  // App Settings
  async createAppSetting(data: CreateAppSettingRequest): Promise<AppSetting> {
    return this.request<AppSetting>('/api/settings/app', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listAppSettings(category?: string): Promise<AppSetting[]> {
    const query = category ? `?category=${category}` : '';
    return this.request<AppSetting[]>(`/api/settings/app${query}`);
  }

  async getAppSetting(key: string): Promise<AppSetting> {
    return this.request<AppSetting>(`/api/settings/app/${key}`);
  }

  async updateAppSetting(
    key: string,
    data: UpdateAppSettingRequest
  ): Promise<AppSetting> {
    return this.request<AppSetting>(`/api/settings/app/${key}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteAppSetting(key: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/settings/app/${key}`, {
      method: 'DELETE',
    });
  }

  // API Keys
  async saveAPIKey(provider: string, apiKey: string): Promise<APIKeyStatus> {
    return this.request<APIKeyStatus>('/api/settings/api-keys', {
      method: 'POST',
      body: JSON.stringify({ provider, api_key: apiKey }),
    });
  }

  async listAPIKeys(): Promise<APIKeyStatus[]> {
    return this.request<APIKeyStatus[]>('/api/settings/api-keys');
  }

  async getAPIKeyStatus(provider: string): Promise<APIKeyStatus> {
    return this.request<APIKeyStatus>(`/api/settings/api-keys/${provider}`);
  }

  async deleteAPIKey(provider: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/settings/api-keys/${provider}`, {
      method: 'DELETE',
    });
  }

  // Knowledge Spaces
  async listSpaces(): Promise<KnowledgeSpace[]> {
    return this.request<KnowledgeSpace[]>('/api/spaces/');
  }

  async createSpace(data: CreateSpaceRequest): Promise<KnowledgeSpace> {
    return this.request<KnowledgeSpace>('/api/spaces/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSpace(spaceId: string, data: UpdateSpaceRequest): Promise<KnowledgeSpace> {
    return this.request<KnowledgeSpace>(`/api/spaces/${spaceId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

// 导出单例
export const api = new ApiClient();
