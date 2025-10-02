import React from "react";

type useFetchReturnProps<T> = {
  data: T | null;
  loadingFetch: boolean;
  errorFetch: string | null;
  fetchFunction: (url: string, options?: RequestInit) => void;
};

function useFetch<T>(): useFetchReturnProps<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loadingFetch, setLoadingFetch] = React.useState(false);
  const [errorFetch, setErrorFetch] = React.useState<string | null>(null);

  async function fetchFunction(url: string, options?: RequestInit) {
    try {
      setLoadingFetch(true);

      const response = await fetch(url, options);

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }

      const json = await response.json();

      setData(json);
      setErrorFetch(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorFetch(e.message);
        console.log(e);
      }
    } finally {
      setLoadingFetch(false);
    }
  }

  return {
    data,
    loadingFetch,
    errorFetch,
    fetchFunction,
  };
}

export default useFetch;
