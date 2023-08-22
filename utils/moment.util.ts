import moment from 'moment';

export const previousWeek = () => moment().add(-7, 'days').format('YYYY-MM-DD');
export const nextYear = () => moment().add(365, 'days').format('YYYY-MM-DD');
export const getShiftEndTime = (time: string, hours: number) => moment(time, 'HH:mm').add(hours, 'h').format('HH:mm');
export const getShiftTime = (time: string, hours: number) => {
    const startTime = moment(time, 'HH:mm').format('h:mmA');
    const endTime = moment(time, 'HH:mm').add(hours, 'h').format('h:mmA');
    return startTime + '-' + endTime;
};
export const getShiftDate = (date: string) => moment(date, 'YYYY-MM-DD').format('MMM D');
