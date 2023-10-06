import { useApiContext } from "contexts/useApiContext"
import { DEFAULT_ACCESS_TOKEN } from "../constants/ApiConstants"
const { user } = useApiContext()
export type BodyInit = Blob | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | FormData | string | null
export type HeadersInit = Headers | string[][] | { [key: string]: string }
export type OptType = {
  method: string
  body?: BodyInit
  cacheKey?: string
  headers?: HeadersInit
}
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'x-access-token': (user.token === null || undefined) ? DEFAULT_ACCESS_TOKEN : user.token,
};