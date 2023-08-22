import { facilityFinderForShifts, intelyProData, intelyProFinder, openShiftData, shiftFinder } from '@fixtures/types';
import { status4xx, statusOK } from '@fixtures/regex';
import userController from '../controllers/user.controller';
import searchengineController from '../controllers/searchengine.controller';
import opsController from '../controllers/ops.controller';

class AdminAPI {

    async login(adminData: Partial<intelyProData>): Promise<Partial<intelyProData>> {
        const { data, status } = await userController.logon({
            email: adminData.email,
            password: adminData.password,
        });
        await expect(String(status)).toMatch(statusOK);
        await expect(String(data.code)).toMatch(statusOK);
        if (!adminData.profile) adminData.profile = {} as intelyProData['profile'];
        ({ cookievalue: adminData.cookievalue, userid: adminData.profile.uid } = data.data);
        return adminData;
    }

    async getShifts(
        {
            facilityFinder,
            shiftFinder,
            intelyProFinder,
        }: {
            facilityFinder?: Partial<facilityFinderForShifts>;
            shiftFinder?: Partial<shiftFinder>;
            intelyProFinder?: Partial<intelyProFinder>;
        },
        cookievalue: intelyProData['cookievalue']
    ) {
        const { data, status } = await searchengineController.getShifts(
            {
                facilityFinder,
                shiftFinder,
                intelyProFinder,
            },
            cookievalue
        );
        if (data?.errors) {
            if (data.errors[0]?.message === 'No Shifts Found' || data?.errors[0]?.message === 'Client not Found')
                await expect(String(status)).toMatch(status4xx);
        } else await expect(String(status)).toMatch(statusOK);
        let shiftsData: openShiftData[] = [];
        if (!data.errors) {
            shiftsData = data.data.map((shiftData) => {
                return {
                    type: shiftData.typePref,
                    client: shiftData.client,
                    date: shiftData.caredate,
                    time: shiftData.caretime,
                    hours: shiftData.hours,
                    state: shiftData.state,
                    reqdid: String(shiftData.reqdid),
                };
            });
        }

        return shiftsData;
    }
    async changeShiftsStatus(
        shiftsStatus: string,
        shiftsData: openShiftData[],
        uid: intelyProData['profile']['uid'],
        cookievalue: intelyProData['cookievalue']
    ) {
        const shiftsID = shiftsData.map((shiftData) => shiftData.reqdid);
        const { data, status } = await opsController.changeShiftsStatus(shiftsStatus, shiftsID, uid, cookievalue);
        await expect(String(status)).toMatch(statusOK);
        await expect(String(data.code)).toMatch(statusOK);
    }
}
export default new AdminAPI();
