import { useApiRequest } from "../../hooks/useApiRequest";

const useActionsApi = <T>(entity: string) => {
  const { data, isLoading, error, fetchData } = useApiRequest<T>();

  const retrieve = async () => {
    await fetchData(`/${entity}/retrieve`, "GET");
  };

  const create = async (payload: T) => {
    await fetchData(`/${entity}/create`, "POST", payload);
  };

  const update = async (payload: T) => {
    await fetchData(`/${entity}/update`, "PATCH", payload);
  };

  const remove = async (id: string) => {
    await fetchData(`/${entity}/delete`, "DELETE", { id });
  };

  const disable = async (id: string) => {
    await fetchData(`/${entity}/disable`, "PATCH", { id });
  };

  const enable = async (id: string) => {
    await fetchData(`/${entity}/enable`, "PATCH", { id });
  };

  return {
    retrieve,
    create,
    update,
    remove,
    enable,
    data,
    disable,
    isLoading,
    error,
  };
};

export default useActionsApi;
