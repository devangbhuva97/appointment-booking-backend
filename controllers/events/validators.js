const momentTZ = require('moment-timezone');
const moment = require('moment');
const MESSAGES = require('../../helpers/messages');
const config = require('../../config');

const { date_format: DATE_FORMAT, date_time_format: DATE_TIME_FORMAT, timezone: TIMEZONE } = config;

const ALL_TIMEZONES = moment.tz.names();

const getFreeSlots = (params) => {

  const { date, timezone } = params;

  const isValidDateFormat = moment(date, DATE_FORMAT, true).isValid();
  if (!isValidDateFormat) return { isValid: false, errorMessage: MESSAGES.INVALID_DATE_FORMAT };

  const isValidTimezone = ALL_TIMEZONES.includes(timezone);
  if (!isValidTimezone) return { isValid: false, errorMessage: MESSAGES.INVALID_TIMEZONE };

  const today = momentTZ.tz(TIMEZONE).format(DATE_FORMAT);
  const isValidDate = moment(date).isSameOrAfter(today);
  if (!isValidDate) return { isValid: false, errorMessage: MESSAGES.DATE_AFTER_TODAY };

  return { isValid: true };

}

const getEvents = (params) => {

  const { start_date, end_date, timezone } = params;

  const isValidStartDateFormat = moment(start_date, DATE_FORMAT, true).isValid();
  if (!isValidStartDateFormat) return { isValid: false, errorMessage: MESSAGES.INVALID_START_DATE_FORMAT };

  const isValidEndDateFormat = moment(end_date, DATE_FORMAT, true).isValid();
  if (!isValidEndDateFormat) return { isValid: false, errorMessage: MESSAGES.INVALID_END_DATE_FORMAT };

  const isValidStartEndDate = moment(start_date).isSameOrBefore(end_date);
  if (!isValidStartEndDate) return { isValid: false, errorMessage: MESSAGES.INVALID_START_DATE_END_DATE };

  const isValidTimezone = ALL_TIMEZONES.includes(timezone);
  if (!isValidTimezone) return { isValid: false, errorMessage: MESSAGES.INVALID_TIMEZONE };

  return { isValid: true };

}

const createEvent = (params) => {

  const { date_time, duration, timezone } = params;

  const isValidDateFormat = moment(date_time, DATE_TIME_FORMAT, true).isValid();
  if (!isValidDateFormat) return { isValid: false, errorMessage: MESSAGES.INVALID_DATE_TIME_FORMAT };

  if (duration < 10 || duration > 60) return { isValid: false, errorMessage: MESSAGES.INVALID_DURATION };

  const isValidTimezone = ALL_TIMEZONES.includes(timezone);
  if (!isValidTimezone) return { isValid: false, errorMessage: MESSAGES.INVALID_TIMEZONE };

  const current = momentTZ.tz(TIMEZONE).utc().format();
  const dateTime = momentTZ.tz(date_time, DATE_TIME_FORMAT, timezone).utc().format();
  
  const isValidDateTime = moment(dateTime).isSameOrAfter(current);
  if (!isValidDateTime) return { isValid: false, errorMessage: MESSAGES.DATE_TIME_AFTER_CURRENT_TIME };

  return { isValid: true };

}

module.exports = {
  getFreeSlots,
  getEvents,
  createEvent,
}

