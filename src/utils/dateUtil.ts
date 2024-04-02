import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const MONTH_FORMAT = 'YYYY-MM';

export function formatToDateTime(date: dayjs.ConfigType = undefined, format = DATE_TIME_FORMAT) {
  return dayjs(date).format(format);
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT) {
  return dayjs(date).format(format);
}

export function formatToMonth(date: dayjs.ConfigType = undefined, format = MONTH_FORMAT) {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
