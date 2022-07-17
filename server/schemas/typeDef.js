const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
  tutors: [Tutor]!
  savedTutors: [Tutor]!
}

type Tutor {
  _id: ID
  tutorAbout: String
  tutorEmail: String
  tutorLoc: String
  tutorCert: String
  tutorPic: String
  tutorPh: String
  tutorAuthor: String
  tutorFirst: String
  tutorLast: String
  createdAt: String
  ratings: [Rating]!
}

type Rating {
  _id: ID
  ratingText: String
  ratingAuthor: String
  createdAt: String
}

type Auth {
  token: ID!
  user: User
}

input tutorInput {
  _id: ID
  tutorAbout: String
  tutorEmail: String
  tutorLoc: String
  tutorCert: String
  tutorPic: String
  tutorPh: String
  tutorAuthor: String
  tutorFirst: String
  tutorLast: String
  createdAt: String
}

type Query {
  users: [User]
  user(email: String!): User
  tutors(email: String): [Tutor]
  tutor(tutorId: ID!): Tutor
  me: User
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addTutor(tutorAbout: String!, tutorLoc: String, tutorCert: String, tutorPic: String, tutorPh: String): Tutor
  updateTutor(tutorId: ID!, tutorAbout: String!, tutorLoc: String, tutorCert: String, tutorPic: String, tutorPh: String): Tutor
  addRating(tutorId: ID!, ratingText: String!): Tutor
  removeTutor(tutorId: ID!): Tutor
  removeRating(tutorId: ID!, ratingId: ID!): Tutor
  saveTutor(tutorId: ID!): User
  removeSavedTutor(tutorId: String!): User
}
`;

module.exports = typeDefs;
