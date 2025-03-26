import { useState } from "react";
import { ApiRequest } from "../utils/apiRequest";
import { api_url } from "../utils/constants";
import { useNotification } from "../state/context/NotificationContext";

interface UseApiRequestResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (
    endpoint: string,
    method: string,
    body?: any,
    showNotifi?: boolean
  ) => Promise<void>;
}

// Custom hook to handle API requests, that uses the ApiRequest util function and the useToastActions hook, so it can show notifications when the request is completed
// and there is no need to handle the response in the component
export const useApiRequest = <T>(): UseApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const fetchData = async (
    endpoint: string,
    method: string,
    body?: any,
    showNotifi: boolean = true
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiRequest<T>(
        `${api_url}${endpoint}`,
        method,
        body
      );

      console.log(response.data, "response");
      if (showNotifi) {
        showNotification(response?.data.message, "success");
      }

      setData(response.data?.data);
    } catch (err: any) {
      showNotification(err.response?.data?.message, "error");

      setError(err.response?.data?.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};
