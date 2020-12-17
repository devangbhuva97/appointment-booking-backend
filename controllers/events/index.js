const momentTZ = require('moment-timezone');
const moment = require('moment');

const FirestoreClient = require('../../libs/firestore');
const MESSAGES = require('../../helpers/messages');
const config = require('../../config');

const { date_format: DATE_FORMAT, date_time_format: DATE_TIME_FORMAT } = config;
const { collection: COLLECTION } = config.firestore;

const validators = require('./validators');

const {
  generateUTCTimeSlots,
  getUserAllSlots,
  getEventsByDates,
  generateEventsSlots,
} = require('./helpers');

const getFreeSlots = async (_, args) => {

  try {

    const { date, timezone } = args;

    const { isValid, errorMessage } = validators.getFreeSlots(args);
    if (!isValid) throw new Error(errorMessage);

    const userAllSlots = getUserAllSlots(date);

    const clientUTCStartTime = momentTZ.tz(date, DATE_FORMAT, timezone).startOf('day').utc().format();
    const clientUTCEndTime = momentTZ.tz(date, DATE_FORMAT, timezone).endOf('day').utc().format();

    const availableSlotsForClient = userAllSlots.filter(slot => moment(slot).utc().isBetween(clientUTCStartTime, clientUTCEndTime, undefined, '[]'));

    const bookedEvents = await getEventsByDates(clientUTCStartTime, clientUTCEndTime);

    const allBookedSlots = generateEventsSlots(bookedEvents);

    const freeSlots = availableSlotsForClient.filter(slot => !allBookedSlots.includes(slot)).map(value => momentTZ.tz(value, timezone).format(DATE_TIME_FORMAT));

    return freeSlots;

  } catch (error) {
    
    throw new Error(error.message || MESSAGES.SOMETHING_WENT_WRONG);

  }

}

const getEvents = async (_, args) => {

  try {

    const { start_date, end_date, timezone } = args;

    const { isValid, errorMessage } = validators.getEvents(args);
    if (!isValid) throw new Error(errorMessage);

    const clientUTCStartTime = momentTZ.tz(start_date, DATE_FORMAT, timezone).startOf('day').utc().format();
    const clientUTCEndTime = momentTZ.tz(end_date, DATE_FORMAT, timezone).endOf('day').utc().format();
    
    const events = await FirestoreClient.getDocsByDates(COLLECTION, clientUTCStartTime, clientUTCEndTime);

    if (!events) return null;

    const formattedEvent = [];

    events.forEach(doc => {
      const docData = doc.data();
      formattedEvent.push({
        start_time: momentTZ.tz(docData.start_time, timezone).format(DATE_TIME_FORMAT),
        end_time: momentTZ.tz(docData.end_time, timezone).format(DATE_TIME_FORMAT),
      });
    });

    return formattedEvent;

  } catch (error) {

    throw new Error(error.message || MESSAGES.SOMETHING_WENT_WRONG);

  }

}

const createEvent = async (_, args) => {
  
  const response = { success: false, message: MESSAGES.COULD_NOT_CREATE_EVENT };

  try {

    const { date_time, duration, timezone } = args.data;

    const { isValid, errorMessage } = validators.createEvent(args.data);
    if (!isValid) return { ...response, message: errorMessage };

    const startTime = momentTZ.tz(date_time, DATE_TIME_FORMAT, timezone).utc().format();
    const endTime = momentTZ.tz(date_time, DATE_TIME_FORMAT, timezone).add(duration, 'minutes').utc().format();

    const requiredSlots = generateUTCTimeSlots(startTime, endTime);

    const date = moment(date_time, DATE_TIME_FORMAT).format(DATE_FORMAT);

    const userAllSlots = getUserAllSlots(date);

    const prevDate = moment(date, DATE_FORMAT).subtract(1, 'days').startOf('day').utc().format();
    const nextDate = moment(date, DATE_FORMAT).add(1, 'days').endOf('day').utc().format();
    const bookedEvents = await getEventsByDates(prevDate, nextDate);

    const allBookedSlots = generateEventsSlots(bookedEvents);

    const hasSlotsAvailable = requiredSlots.every(slot => !allBookedSlots.includes(slot) && userAllSlots.includes(slot));

    if (!hasSlotsAvailable) return { ...response, message: MESSAGES.SLOT_NOT_AVAILABLE };

    await FirestoreClient.save(COLLECTION, { start_time: startTime, end_time: endTime });

    return { success: true, message: MESSAGES.EVENT_CREATED };

  } catch (error) {

    return response;

  }

}

module.exports = {
  getFreeSlots,
  getEvents,
  createEvent
}