import { MAILSAC_TOKEN, MAILSAC_URL_API } from '@fixtures/constants';
import axios, { AxiosInstance } from 'axios';

export class BaseController {
    /**
     * Mailsac API Instance
     *
     * `Axios Instance` with base configurations(`baseURL`,`headers`, etc.).
     * @public
     * @type {AxiosInstance}
     */
    public mailsacAPI: AxiosInstance;
    constructor() {
        const options = {
            baseURL: MAILSAC_URL_API,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Mailsac-Key': MAILSAC_TOKEN,
                Host: 'mailsac.com',
            }, // add here static headers
        };
        this.mailsacAPI = axios.create(options);
    }
}
