const GraphQLJSON = require('graphql-type-json');

const {
  getFreeSlots,  
  getEvents,
  createEvent
} = require('../controllers/events');

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    free_slots: getFreeSlots,
    events: getEvents
  },
  Mutation: {
    create_event: createEvent
  }
}

module.exports = resolvers;