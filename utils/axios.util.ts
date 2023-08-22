import axios, { AxiosError, AxiosResponse } from 'axios';
import { consoleLogFormated } from './util';
import FormData = require('form-data');

export const axiosErrorHandler = (error: Error | AxiosError, name: string) => {
    if (axios.isAxiosError(error)) {
        let status: AxiosError['response']['status'],
            headers: AxiosError['response']['headers'],
            config: AxiosError['response']['config'],
            data: AxiosError['response']['data'],
            baseURL: AxiosError['response']['config']['baseURL'],
            method: AxiosError['response']['config']['method'],
            url: AxiosError['response']['config']['url'],
            params: AxiosError['response']['config']['params'],
            body: AxiosError['response']['config']['data'];
        if (error.response) {
            ({ status, headers, config, data } = error.response as AxiosError['response']);
            ({ baseURL, method, url, params, data: body } = config);
        }
        console.log(`\n↓--------------------------ERROR ${name}-----------------------------↓`);
        console.log(
            error.response
                ? {
                      status,
                      data,
                      headers,
                      baseURL,
                      method,
                      url,
                      params,
                      body: body && !(body instanceof FormData) ? JSON.parse(body) : body,
                  }
                : error
        );
        console.log(`↑--------------------------ERROR ${name}-----------------------------↑\n`);
        return { status, data };
    } else throw error;
};

export const axiosResponseHandler = (
    {
        status,
        data,
        config,
    }: {
        data: AxiosResponse['data'];
        status: AxiosResponse['status'];
        config: AxiosResponse['config'];
    },
    name: string
) => {
    const { baseURL, method, url, params, data: body } = config;
    consoleLogFormated(
        {
            status,
            data,
            baseURL,
            method,
            url,
            params,
            body: body && !(body instanceof FormData) ? JSON.parse(body) : body,
        },
        name,
        {
            depth: null,
            colors: true,
        }
    );
    return { status, data };
};
