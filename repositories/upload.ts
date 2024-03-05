import { post } from "@/config";
import { IHttpResponse } from "@/interfaces";

export async function uploadImage(request: FormData) {
  // TODO: Add types
  return (await post<FormData>(`upload/image`, request))
    .data as IHttpResponse<any>;
}

export default { uploadImage };
