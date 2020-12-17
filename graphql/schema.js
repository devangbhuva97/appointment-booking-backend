const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  scalar JSON

  type Event {
    start_time: String!
    end_time: String!
  }

  type Query {
    free_slots(date: String! timezone: String!): [String!],
    events(start_date: String! end_date: String! timezone: String!): [Event!]
  }

  type MutationResponse {
    success: Boolean!
    message: String!
    data: JSON
    errors: [String!]
  }

  input CreateEventInput {
    date_time: String!
    duration: Int!
    timezone: String!
  }

  type Mutation {
    create_event(data: CreateEventInput!): MutationResponse
  }

`

module.exports = typeDefs;