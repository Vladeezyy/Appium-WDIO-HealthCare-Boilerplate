import { AxiosMethodResponse, intelyProData } from '@fixtures/types';
import { BaseController } from './base.controller';
import { axiosResponseHandler, axiosErrorHandler } from 'utils/axios.util';

class ManageController extends BaseController {
    async acceptTermsOfService(
        uid: intelyProData['profile']['uid'],
        cookievalue: intelyProData['cookievalue']
    ): Promise<AxiosMethodResponse> {
        return await this.intelycareAPI({
            method: 'post',
            url: '/isystem/manage/acceptTermsOfService.php',
            headers: { authorization: cookievalue },
            data: { uid, hash: 'undefined', termsAccept: true, platform: 'Web' },
        })
            .then((response) => axiosResponseHandler(response, 'POST IP Accept Terms Of Service'))
            .catch((error) => axiosErrorHandler(error, 'POST IP Accept Terms Of Service'));
    }
}
export default new ManageController();
