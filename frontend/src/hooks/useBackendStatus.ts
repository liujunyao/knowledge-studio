import { useEffect, useState } from 'react';

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function pingBackend(signal: AbortSignal) {
  const response = await fetch('http://127.0.0.1:13560/health', {
    cache: 'no-store',
    signal,
  });
  if (!response.ok) {
    throw new Error('Backend not ready');
  }
  return response.json();
}

export function useBackendStatus(pollInterval = 1000, timeoutMs = 20000) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [retryIndex, setRetryIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function checkBackend() {
      const startTime = Date.now();
      setAttempts(0);
      setElapsed(0);
      setReady(false);
      setError(null);
      setAttempts(0);

      while (!cancelled) {
        try {
          setAttempts((prev) => prev + 1);
          await pingBackend(controller.signal);
          if (!cancelled) {
            setReady(true);
          }
          return;
        } catch {
          const duration = Date.now() - startTime;
          setElapsed(duration);
          if (Date.now() - startTime > timeoutMs) {
            if (!cancelled) {
              setError('无法连接后端服务，请检查 Python 环境或稍后重试。');
            }
            return;
          }
          await delay(pollInterval);
        }
      }
    }

    checkBackend();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [pollInterval, timeoutMs, retryIndex]);

  const retry = () => {
    setRetryIndex((prev) => prev + 1);
  };

  return { ready, error, attempts, elapsed, retry };
}
