import { DEFAULT_HEADERS, OptType } from "./ApiTypes";
import { BASE_URL, TIME_OUT } from "../constants/ApiConstants";


const httpTimeout = (ms: number, promise: Promise<Response>) => {
    return new Promise<Response>(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error('request timeout'));
        }, ms);
        promise.then(resolve, reject);
    });
};

export const sendRequest = (url: RequestInfo, opts: OptType) => {
    if (opts.body) opts.body = JSON.stringify(opts.body)
    const newUrl = `${BASE_URL}${url}`;
    console.log("send request", newUrl, opts)

    return httpTimeout(
        TIME_OUT,
        fetch(newUrl, { ...opts, headers: { ...DEFAULT_HEADERS, ...opts.headers } }),
    )
        .then((res: any) => {
            return res.json();
        })
        .catch((error) => {
            console.error('Request error:', error);
        })
}