import { apiClient } from "@/utils/apis/client";
import type { ApiError, GetCodemodResponse } from "@codemod-com/utilities";
import type { AxiosError } from "axios";
import { Either } from "../utils/Either";

export const getCodemod = async (options: {
  name: string;
  token: string;
}): Promise<Either<ApiError | string, GetCodemodResponse>> => {
  const { name, token } = options;

  try {
    const res = await apiClient.get<GetCodemodResponse>(`codemods/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return Either.right(res.data);
  } catch (e) {
    const err = e as AxiosError<ApiError>;
    return Either.left(err.response?.data ?? err.message);
  }
};
