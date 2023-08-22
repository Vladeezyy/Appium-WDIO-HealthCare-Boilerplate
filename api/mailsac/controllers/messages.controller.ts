import { axiosResponseHandler, axiosErrorHandler } from '@utils/axios.util';

import { BaseController } from './base.controller';

class MessagesController extends BaseController {
    async getMailsacMsgList(email: string) {
        return await this.mailsacAPI({
            method: 'get',
            url: `addresses/${email}/messages`,
        })
            .then((response) => axiosResponseHandler(response, 'GET IP Document'))
            .catch((error) => axiosErrorHandler(error, 'GET IP Document'));
    }

    async getMailsacMsgTxt(email: string, messageId: string) {
        return await this.mailsacAPI({
            method: 'get',
            url: `text/${email}/${messageId}`,
        })
            .then((response) => axiosResponseHandler(response, 'GET IP Document'))
            .catch((error) => axiosErrorHandler(error, 'GET IP Document'));
    }
}
export default new MessagesController();
