import { useState } from "react";
import { ApiRequest } from "../utils/apiRequest";

interface UseApiRequestResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (endpoint: string, method: string, body?: any) => Promise<void>;
}

// Custom hook to handle API requests, that uses the ApiRequest util function and the useToastActions hook, so it can show notifications when the request is completed
// and there is no need to handle the response in the component
export const useApiRequest = <T>(): UseApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (endpoint: string, method: string, body?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiRequest<T>(endpoint, method, body);

      console.log(response, "response");

      setData(response.data?.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};
