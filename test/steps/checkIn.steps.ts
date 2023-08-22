import navigationBar from '@pages/components/navigation.bar';
import myShiftsPage from '@pages/checkIn/myShifts.page';
import shiftDetailsPage from '@pages/checkIn/shiftDetails.page';
import adbCommandsUtil from '@utils/adbCommands.util';
import dateTimeSettingsScreen from '../../systemScreens/android/dateTimeSettings.screen';
import dateUtil from '@utils/date.util';
import searchShiftsSteps from '@steps/searchShifts.steps';
import gesturesHelper from '@helpers/gestures.helper';
import explorePage from '@pages/explore.page';
import openShiftsAcceptPage from '@pages/checkIn/openShiftsAccept.page';
import pinPadPage from '@pages/prompts/pinPad.page';
import acceptShiftPopup from '@pages/popups/acceptShift.popup';
import upcomingShiftPopup from '@pages/popups/upcomingShift.popup';
import searchBarComponent from '@pages/components/searchBar.component';
import filtersAppliedMessagePopup from '@pages/popups/filtersAppliedMessage.popup';
import checkInDetailsPage from '@pages/checkIn/checkInDetails.page';
import handPhoneToStaffPopup from '@pages/popups/handPhoneToStaff.popup';
import signAndReviewPage from '@pages/checkIn/signAndReview.page';
import youSecuredShiftPopup from '@pages/popups/youSecuredShift.popup';
import { createdShiftData } from '@fixtures/types';

class CheckInSteps {
    async acceptShiftFromExploreScreen(pinCode: string, shiftCardData: Partial<createdShiftData> = {}) {
        if (driver.isIOS) {
            await this.acceptShiftFromExploreScreenIos(pinCode, shiftCardData);
        } else {
            await this.acceptShiftFromExploreScreenAndroid(pinCode);
        }
    }

    private async acceptShiftFromExploreScreenAndroid(pinCode: string) {
        await searchShiftsSteps.resetSearchFilterIfNotDefault();
        const shiftDate: string = dateUtil.getShiftsSearchShortDate(dateUtil.getTodayDate());

        await gesturesHelper.scrollDownTo(await explorePage.cardShift(1), { limit: 2 });
        await explorePage.lblShiftRateByFacilityNameAndDate('', shiftDate).click();
        await expect(openShiftsAcceptPage.btnAccept).toBeDisplayed();
        await openShiftsAcceptPage.btnAccept.click();
        await pinPadPage.enterPin(pinCode);
        await expect(acceptShiftPopup.btnAccept).toBeDisplayed();
        await acceptShiftPopup.btnAccept.click();

        await expect(upcomingShiftPopup.btnIllBeThere).toBeDisplayed();
        await await upcomingShiftPopup.clickIfDisplayed(await upcomingShiftPopup.btnIllBeThere);
        await await upcomingShiftPopup.clickIfDisplayed(await upcomingShiftPopup.btnOkGotIt);
        await filtersAppliedMessagePopup.clickBtnGotItIfDisplayed();
        await gesturesHelper.tapOnElement(await searchBarComponent.txbSearch);
        await filtersAppliedMessagePopup.clickBtnGotItIfDisplayed();
        await navigationBar.btnMyShifts.click();
        await myShiftsPage.btnShiftCardByDate(shiftDate).click();
    }

    private async acceptShiftFromExploreScreenIos(pinCode: string, shiftCardData: Partial<createdShiftData> = {}) {
        const shiftDate: string = dateUtil.getShiftsSearchShortDate(dateUtil.getTodayDate());

        await explorePage.updatePage({ isWithShifts: true, limit: 10 }, shiftCardData);
        await explorePage.lblShiftRateByFacilityNameAndDate('', shiftDate).click();
        await expect(openShiftsAcceptPage.btnAccept).toBeDisplayed();
        await openShiftsAcceptPage.btnAccept.click();
        await pinPadPage.enterPin(pinCode);
        await expect(acceptShiftPopup.btnAccept).toBeDisplayed();
        await acceptShiftPopup.btnAccept.click();
        await youSecuredShiftPopup.lblHeader.waitForDisplayed();
        await gesturesHelper.tapOnElement(await searchBarComponent.txbSearch);
        await navigationBar.btnMyShifts.click();

        await this.acceptPopups();
        //await filtersAppliedMessagePopup.clickBtnGotItIfDisplayed();
    }

    async acceptPopups() {
        await await upcomingShiftPopup.clickIfDisplayed(await upcomingShiftPopup.btnIllBeThere);
        await await upcomingShiftPopup.clickIfDisplayed(await upcomingShiftPopup.btnOkGotIt);
    }

    async goToCheckInPinPadFromExplore(shiftDate: string) {
        await navigationBar.btnMyShifts.click();
        await myShiftsPage.btnShiftCardByDate(shiftDate).click();
        await shiftDetailsPage.btnCheckIn.click();
    }

    async changeSystemTime(date: Date) {
        if (driver.isAndroid) {
            await adbCommandsUtil.openDateTimeSettings();
            await dateTimeSettingsScreen.changeTimeTo(date);
            await adbCommandsUtil.switchToPreviousApp();
        }
    }

    async doCheckInFromCheckInDetailsPage(nurseName: string) {
        await checkInDetailsPage.txbNurseName.setValue(nurseName);
        await checkInDetailsPage.btnProvideSignature.click();
        await handPhoneToStaffPopup.clickIfDisplayed(await handPhoneToStaffPopup.btnContinue);
        await signAndReviewPage.btnAuthorizedStaff.click();
        await gesturesHelper.makeSignature(await signAndReviewPage.lblSignArea);
        await signAndReviewPage.btnApproveAndClose.click();
        await checkInDetailsPage.btnCheckIn.click();
        if (driver.isAndroid) {
            await checkInDetailsPage.btnCloseSuccessfulCheckInMsg.click();
        }
    }
}
export default new CheckInSteps();
