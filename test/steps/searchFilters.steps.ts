import gesturesHelper from "@helpers/gestures.helper";
import searchFiltersPage from "@pages/searchFilters.page";

class SearchFiltersSteps {
    async clickOnCheckBoxes(listOfChBoxes: string[]) {
        for (const chBox of listOfChBoxes) {
            await gesturesHelper.scrollDownTo(await searchFiltersPage.getCheckBoxByName(chBox), 4);
            await searchFiltersPage.getCheckBoxByName(chBox).click();
        }
    }
}
export default new SearchFiltersSteps();