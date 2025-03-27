import { useApiRequest } from "../../hooks/useApiRequest";

const useActionsApi = <T>(entity: string) => {
  const { data, isLoading, error, fetchData } = useApiRequest<T>();

  const retrieve = async () => {
    await fetchData(`/${entity}/retrieve`, "GET");
  };

  const create = async (payload: T) => {
    await fetchData(`/${entity}/create`, "POST", payload);
  };

  const update = async (payload: T, id: string) => {
    await fetchData(`/${entity}/update/${id}`, "PATCH", { payload });
  };

  const remove = async (id: string, payload: string) => {
    await fetchData(`/${entity}/delete/${id}`, "DELETE", {
      deleteKey: payload,
    });
  };

  const disable = async (id: string) => {
    await fetchData(`/${entity}/disable/${id}`, "PATCH", { id });
  };

  const enable = async (id: string) => {
    await fetchData(`/${entity}/enable/${id}`, "PATCH", { id });
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
