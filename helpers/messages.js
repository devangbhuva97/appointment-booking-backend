const config = require('../config');
const { 
  date_format: DATE_FORMAT, 
  date_time_format: DATE_TIME_FORMAT 
} = config;

const MESSAGES = {
  SOMETHING_WENT_WRONG: 'Something went wrong!',
  INVALID_DATE_FORMAT: `Date must be ${DATE_FORMAT} format.`,
  INVALID_TIMEZONE: 'Please enter valid timezone.',
  DATE_AFTER_TODAY: 'Date must be same or after today.',
  INVALID_START_DATE_FORMAT: `Start date must be ${DATE_FORMAT} format.`,
  INVALID_END_DATE_FORMAT: `End date must be ${DATE_FORMAT} format.`,
  INVALID_START_DATE_END_DATE: 'Start date must be same or before end date.',
  DATES_BEFORE_TODAY: 'Date(s} must be same or before today.',
  INVALID_DATE_TIME_FORMAT: `Date time must be ${DATE_TIME_FORMAT} format.`,
  INVALID_DURATION: 'Duration must be between 10 to 60.',
  DATE_TIME_AFTER_CURRENT_TIME: 'Date time must be same or after current date time.',
  COULD_NOT_CREATE_EVENT: 'We could not able create event. Please try again.',
  SLOT_NOT_AVAILABLE: 'Slot(s) are not available.',
  EVENT_CREATED: 'Event created successfully!'
}

module.exports = MESSAGES;