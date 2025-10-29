"""
LLM Service using LiteLLM for unified interface
"""
import os
from typing import AsyncGenerator, Optional, Dict, Any
from litellm import acompletion, ModelResponse
from litellm.exceptions import APIError, Timeout, RateLimitError

class LLMService:
    """统一的 LLM 服务接口"""

    # 支持的模型配置
    SUPPORTED_MODELS = {
        "openai": [
            "gpt-4",
            "gpt-4-turbo",
            "gpt-4o",
            "gpt-3.5-turbo"
        ],
        "anthropic": [
            "claude-3-5-sonnet-20241022",
            "claude-3-opus-20240229",
            "claude-3-sonnet-20240229",
            "claude-3-haiku-20240307"
        ],
        "google": [
            "gemini-pro",
            "gemini-1.5-pro",
            "gemini-1.5-flash"
        ],
        "ollama": [
            "llama3.2",
            "llama3.1",
            "qwen2.5",
            "mistral"
        ]
    }

    @staticmethod
    def get_model_string(provider: str, model_name: str) -> str:
        """
        构建 LiteLLM 模型字符串

        LiteLLM 格式:
        - OpenAI: "gpt-4"
        - Anthropic: "claude-3-5-sonnet-20241022"
        - Google: "gemini/gemini-pro"
        - Ollama: "ollama/llama3.2"
        """
        if provider == "google":
            return f"gemini/{model_name}"
        elif provider == "ollama":
            return f"ollama/{model_name}"
        else:
            return model_name

    @staticmethod
    def get_api_key_env_name(provider: str) -> str:
        """获取 API Key 环境变量名"""
        env_map = {
            "openai": "OPENAI_API_KEY",
            "anthropic": "ANTHROPIC_API_KEY",
            "google": "GEMINI_API_KEY",
            "ollama": None  # Ollama 不需要 API Key
        }
        return env_map.get(provider)

    @staticmethod
    async def chat_completion(
        provider: str,
        model_name: str,
        messages: list[Dict[str, str]],
        api_key: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        stream: bool = False,
        **kwargs
    ) -> ModelResponse | AsyncGenerator[Dict[str, Any], None]:
        """
        调用 LLM 进行对话补全

        Args:
            provider: 提供商 (openai, anthropic, google, ollama)
            model_name: 模型名称
            messages: 消息列表 [{"role": "user", "content": "..."}]
            api_key: API 密钥(可选,如果不提供则从环境变量读取)
            temperature: 温度参数
            max_tokens: 最大生成 token 数
            stream: 是否使用流式响应
            **kwargs: 其他参数

        Returns:
            ModelResponse 或 AsyncGenerator (如果 stream=True)
        """
        # 构建模型字符串
        model = LLMService.get_model_string(provider, model_name)

        # 设置 API Key
        if api_key:
            # 临时设置环境变量
            env_name = LLMService.get_api_key_env_name(provider)
            if env_name:
                os.environ[env_name] = api_key

        try:
            # 调用 LiteLLM
            response = await acompletion(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=stream,
                **kwargs
            )

            if stream:
                return LLMService._stream_response(response)
            else:
                return response

        except RateLimitError as e:
            raise Exception(f"Rate limit exceeded: {str(e)}")
        except Timeout as e:
            raise Exception(f"Request timeout: {str(e)}")
        except APIError as e:
            raise Exception(f"API error: {str(e)}")
        except Exception as e:
            raise Exception(f"LLM service error: {str(e)}")

    @staticmethod
    async def _stream_response(response):
        """处理流式响应"""
        async for chunk in response:
            if chunk.choices and len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if hasattr(delta, 'content') and delta.content:
                    yield {
                        "type": "content",
                        "content": delta.content
                    }

    @staticmethod
    def validate_model(provider: str, model_name: str) -> bool:
        """验证模型是否支持"""
        if provider not in LLMService.SUPPORTED_MODELS:
            return False
        return model_name in LLMService.SUPPORTED_MODELS[provider]

    @staticmethod
    def list_models(provider: Optional[str] = None) -> Dict[str, list[str]]:
        """列出支持的模型"""
        if provider:
            return {provider: LLMService.SUPPORTED_MODELS.get(provider, [])}
        return LLMService.SUPPORTED_MODELS
