import searchShiftsPage from '@pages/searchShifts.page';
import searchFiltersPage from '@pages/searchFilters.page';
import filtersAppliedMessagePopup from '../pages/popups/filtersAppliedMessage.popup';
import gesturesHelper from '@helpers/gestures.helper';

class SearchShiftsSteps {
    async resetSearchFilterIfNotDefault(force = false) {
        if (await filtersAppliedMessagePopup.lbl.isDisplayed()) {
            await filtersAppliedMessagePopup.btnGotIt.click();
        }
        if (force || (await searchShiftsPage.lblFilterCounter.isDisplayed())) {
            await searchShiftsPage.btnFilter.click();
            await searchFiltersPage.resetFilterBtn.click();
            await expect(await searchFiltersPage.filtersCountIndicatorLbl).not.toBeDisplayed();
            await searchFiltersPage.closeFilterPageBtn.click();
        }
    }
    async setFilterToShowAll() {
        if (await filtersAppliedMessagePopup.lbl.isDisplayed()) {
            await filtersAppliedMessagePopup.btnGotIt.click();
        }

        await searchShiftsPage.btnFilter.click();
        await gesturesHelper.scrollDownTo(await searchFiltersPage.showAllShiftsBtn);
        await (await searchFiltersPage.showAllShiftsBtn).click();
        await (await searchFiltersPage.showResultsBtn).click();
    }
}
export default new SearchShiftsSteps();
