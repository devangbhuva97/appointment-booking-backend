const momentTZ = require('moment-timezone');
const moment = require('moment');
const config = require('../../config');

const FirestoreClient = require('../../libs/firestore');

const { 
  start_time: START_TIME,
  end_time: END_TIME,
  duration: DURATION,
  timezone: TIMEZONE,
  date_format: DATE_FORMAT,
  date_time_format: DATE_TIME_FORMAT 
} = config;
const { collection: COLLECTION } = config.firestore;

const generateUTCTimeSlots = (start, end, timezone, datetimeFormat) => {

  const startTime = momentTZ.tz(start, datetimeFormat, timezone).utc();
  const endTime = momentTZ.tz(end, datetimeFormat, timezone).utc();

  const timeSlots = [];

  while (startTime < endTime) {
    const slot = momentTZ.tz(startTime, datetimeFormat, timezone).utc().format();
    timeSlots.push(slot);
    startTime.add(DURATION, 'minutes');
  }

  return timeSlots;

}

const getUserAllSlots = (date) => {

  const prevDate = moment(date, DATE_FORMAT).subtract(1, 'days').format(DATE_FORMAT);
  const userPrevDateSlots = generateUTCTimeSlots(`${prevDate} ${START_TIME}`, `${prevDate} ${END_TIME}`, TIMEZONE, DATE_TIME_FORMAT);

  const userCurrentDateSlots = generateUTCTimeSlots(`${date} ${START_TIME}`, `${date} ${END_TIME}`, TIMEZONE, DATE_TIME_FORMAT);

  const nextDate = moment(date, DATE_FORMAT).add(1, 'days').format(DATE_FORMAT);
  const userNextDateSlots = generateUTCTimeSlots(`${nextDate} ${START_TIME}`, `${nextDate} ${END_TIME}`, TIMEZONE, DATE_TIME_FORMAT);

  return [
    ...userPrevDateSlots,
    ...userCurrentDateSlots,
    ...userNextDateSlots
  ];

}

const getEventsByDates = async (startTime, endTime) => {

  const events = await FirestoreClient.getDocsByDates(COLLECTION, startTime, endTime);

  let bookedEvents = [];

  if (events) events.forEach(doc => bookedEvents.push(doc.data()));

  return bookedEvents;

}

const generateEventsSlots = (bookedEvents) => {

  const allDistinctBookedSlots = new Set();

  for (const bookedEvent of bookedEvents) {
    const bookedSlots = generateUTCTimeSlots(bookedEvent.start_time, bookedEvent.end_time); // timezone & datetime format - UTC
    bookedSlots.forEach((slot) => allDistinctBookedSlots.add(slot));
  }

  return Array.from(allDistinctBookedSlots);

}

module.exports = {
  generateUTCTimeSlots,
  getUserAllSlots,
  getEventsByDates,
  generateEventsSlots,
}