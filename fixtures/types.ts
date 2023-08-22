import { AxiosError, AxiosResponse } from 'axios';

export interface selector {
    ios?: string;
    android?: string;
    common?: string;
}
type status = 'broken' | 'failed' | 'skipped';
export interface category {
    name: string;
    matchedStatuses: status[];
    messageRegex?: string;
    traceRegex?: string;
    flaky?: boolean;
}
export interface executor {
    name: string;
    type: string;
    url?: string;
    buildOrder: string;
    buildName: string;
    buildUrl: string;
    reportUrl?: string;
    reportName?: string;
}
export interface AxiosMethodResponse {
    status: AxiosResponse['status'] | AxiosError['response']['status'];
    data: AxiosResponse['data'] | AxiosError['response']['data'];
}