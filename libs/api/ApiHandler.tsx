import { OptType } from "../authsevices/ApiTypes";
import { BASE_URL } from "../utility/Utils";

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'x-access-token': 'Logicease123',
};

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
    return httpTimeout(
        10000,
        fetch(newUrl, { ...opts, headers: { ...DEFAULT_HEADERS, ...opts.headers } }),
    ).then((res: any) => {
        return res.json();
    })
        .catch(rej => rej.message);
};
