import axios from "axios";
import { ApiResponse } from "./common.types";

export const ApiRequest = <T>(endpoint: string, method: string, body?: any) =>
  axios<ApiResponse<T>>({
    url: endpoint,
    method,
    data: body,
    headers: { "Content-Type": "application/json" },
  });
