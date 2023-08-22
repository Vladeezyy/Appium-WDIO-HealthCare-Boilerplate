import moment, { Moment } from 'moment';

const engUsLocale = 'en-US';

class DateUtil {
    getTodayDate(): Date {
        return new Date();
    }

    isBetween(time: string, timePeriod: string[]) {
        const formattedTime: string = time.toLowerCase().replace(/am|pm/gm, '');
        const convertTimeToMins = (a: string): number => parseInt(a.split(':')[0]) * 60 + parseInt(a.split(':')[1]);
        const startMinutes = convertTimeToMins(timePeriod[0]);
        const endMinutes = convertTimeToMins(timePeriod[1]);
        let timeMinutes = convertTimeToMins(formattedTime);
        if (time.toLowerCase().includes('pm')) {
            timeMinutes = timeMinutes + 12 * 60;
        }
        if (endMinutes > startMinutes) {
            return timeMinutes > startMinutes && timeMinutes < endMinutes;
        } else {
            return timeMinutes > startMinutes || timeMinutes < endMinutes;
        }
    }

    /**
     * Now accepts those formats: day shortMonth, day longMonth
     * Example: 23 jan or 23 january
     * If year is not entered, current year will be added
     * @param dateText
     */
    convertStringToDate(dateText: string): Date {
        const currentYear: string = new Date().getFullYear().toString();
        let formattedDateText = dateText;
        const convertedDate = new Date(0);
        if (!dateText.match(/\d{4}/gm)) {
            formattedDateText = formattedDateText.concat(` ${currentYear}`);
        }
        convertedDate.setUTCMilliseconds(Date.parse(formattedDateText));
        return convertedDate;
    }

    convertDateToWeekDayName(date: Date): string {
        return date.toLocaleDateString(engUsLocale, { weekday: 'long' });
    }

    getShiftsSearchFormattedDate(date: Date): string {
        const dayOfWeek = date.toLocaleDateString(engUsLocale, { weekday: 'long' });
        const month = date.toLocaleDateString(engUsLocale, { month: 'long' });
        const day = date.getDate();

        return `${dayOfWeek}, ${month} ${day}`;
    }

    /**
     * Formats date to short format. Example: 23 Jan
     * @param date
     */
    getShiftsSearchShortDate(date: Date): string {
        const month = date.toLocaleDateString(engUsLocale, { month: 'short' });
        const day = date.getDate();

        return `${month} ${day}`;
    }

    getListOfWeekendDates(): Date[] {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        let currentMonthDay = currentDate.getDate();
        const weekendDays = [];

        for (let i = currentDay; i <= 6; i++) {
            if (i === 6 && currentMonthDay) {
                const saturday = new Date();
                const sunday = new Date();
                saturday.setDate(currentMonthDay);
                sunday.setDate(currentMonthDay + 1);
                weekendDays.push(saturday, sunday);
            }
            currentMonthDay++;
        }
        return weekendDays;
    }

    getRandomDateInFuture(maxDaysInFuture: number): Date {
        const now = new Date();
        const randomDaysInFuture = Math.floor(Math.random() * maxDaysInFuture);
        return new Date(now.getTime() + randomDaysInFuture * 24 * 60 * 60 * 1000);
    }

    convertDateToSearchOptionFormat(dateToFormat: Date): string {
        const month = dateToFormat.toLocaleDateString(engUsLocale, { month: 'long' });
        const currentDate = new Date().getDate();
        if (dateToFormat.getDate() === currentDate + 1) {
            return 'Tomorrow';
        }
        if (dateToFormat.getDate() === currentDate) {
            return 'Today';
        }
        return `${month} ${dateToFormat.getDate()}`;
    }

    convertDateToMonthName(dateToFormat: Date): string {
        return dateToFormat.toLocaleDateString(engUsLocale, { month: 'long' });
    }

    convertStringTimeToMoment(HH_MM_a: string): Moment {
        return moment(HH_MM_a, ['h:m a', 'H:m']);
    }
}

export default new DateUtil();
