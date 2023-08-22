import AllureReporter from '@wdio/allure-reporter';
import searchResultsPage from '@pages/searchResults.page';
import dateUtil from '../../utils/date.util';

class SearchResultsSteps {
    async assertSearchResultsByDateAndOption(dates: Date[], searchOption: string) {
        if (driver.isIOS) {
            await this.assertSearchResultsByDateAndOptionOnIphone(dates, searchOption)
        } else {
            await this.assertSearchResultsByDateAndOptionOnAndroid(dates, searchOption)
        }

    }

    private async assertSearchResultsByDateAndOptionOnAndroid(dates: Date[], searchOption: string) {
        await expect(await searchResultsPage.lblSearchOption).toHaveText(searchOption);
        await expect(await searchResultsPage.getDateHeadersText())
            .toEqual(dates.map(elem => dateUtil.getShiftsSearchFormattedDate(elem)));

        for (const dateElement of dates) {
            const todayShortDate = dateUtil.getShiftsSearchShortDate(dateElement);
            const shiftCardDates = await searchResultsPage.getShiftCardsDateTexts(
                dateUtil.getShiftsSearchFormattedDate(dateElement)
            );

            for (const card of shiftCardDates) {
                await expect(await card).toEqual(todayShortDate);
            }
        }
        AllureReporter.endStep();
    }

    private async assertSearchResultsByDateAndOptionOnIphone(dates: Date[], searchOption: string) {
        AllureReporter.startStep(`Asserting shifts search results are correct for "${searchOption}" option in Search Result page`);
        let expectedDates: string[] = dates.map(elem => dateUtil.getShiftsSearchFormattedDate(elem));
        await expect(await searchResultsPage.lblSearchOption).toBeDisplayed();
        (await searchResultsPage.getDateHeadersText()).map(actualDate => expect(expectedDates).toContain(actualDate))

        expectedDates = dates.map(elem => dateUtil.getShiftsSearchShortDate(elem));
        const distinctActualDates: string[] = [...new Set(await searchResultsPage.getAllShiftsDatesTexts())]
        distinctActualDates.map(actualDate => expect(expectedDates).toContain(actualDate));
        AllureReporter.endStep();
    }
}

export default new SearchResultsSteps();
