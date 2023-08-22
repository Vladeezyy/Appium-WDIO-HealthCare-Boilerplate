import { IC_HUB_URL_API } from '@fixtures/constants';
import { status4xx, status5xx } from '@fixtures/regex';
import { consoleLogFormated } from '@utils/util';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const MAX_RETRIES = 15,
    TIME = 1000;

interface AxiosConfig extends AxiosRequestConfig {
    retryCount?: number;
}

interface AxiosConfigCustom extends AxiosConfig {
    retryCount: number;
}
interface AxiosErrorCustom extends AxiosError {
    config: AxiosConfigCustom;
}

export class BaseController {
    /**
     * IntelyCare API Instance
     *
     * `Axios Instance` with base configurations(`baseURL`,`headers`, etc.).
     * With `Interseptor` for catching some error codes(`429`,`500`,`503`,`504`) and retrying requests
     * @public
     * @type {AxiosInstance}
     */
    public intelycareAPI: AxiosInstance;
    constructor() {
        const options = {
            baseURL: IC_HUB_URL_API,
            headers: { accept: 'application/json', 'Content-Type': 'application/json' }, // add here static headers
            // any options that you would want for all axios requests,
            // like (proxy, etc...)
        };
        this.intelycareAPI = axios.create(options);
        this.intelycareAPI.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosErrorCustom) => {
                if (
                    error.response?.status.toString().match(status5xx) ||
                    (error.config.url.includes('searchengine/dashboard/search/facility')
                        ? error.response?.status.toString().match(status4xx)
                        : false) ||
                    error.code === 'ENOTFOUND'
                ) {
                    // set a retry count parameter
                    const retryCount = (error.config.retryCount || 0) + 1;
                    error.config.retryCount = retryCount;
                    consoleLogFormated(
                        { retryCount: error.config.retryCount, status: error?.response?.status, code: error.code },
                        'ERROR',
                        { depth: null, colors: true }
                    );
                    if (retryCount <= MAX_RETRIES) {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(this.intelycareAPI(error.config));
                            }, 2 * retryCount * TIME);
                        });
                    }
                    return Promise.reject(error);
                } else return Promise.reject(error);
            }
        );
    }
}
