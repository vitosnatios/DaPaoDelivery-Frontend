import { useCallback, useState } from 'react';

const useFetch = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(
    async (url: string, options?: RequestInit | undefined) => {
      let response;
      let json;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(import.meta.env.VITE_SERVER_URL + url, options);
        json = await response.json();
        if (!response.ok) throw new Error(json.message);
      } catch (err) {
        if (err instanceof Error) setError(err?.message);
      } finally {
        setLoading(false);
      }
      return { response, json };
    },
    []
  );

  return {
    loading,
    error,
    request,
    setError,
  };
};

export default useFetch;
