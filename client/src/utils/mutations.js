import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_TUTOR = gql`
  mutation addTutor(
    $tutorAbout: String!
    $tutorLoc: String
    $tutorCert: String
    $tutorPic: String
    $tutorPh: String
    ) {
    addTutor(tutorAbout: $tutorAbout, tutorLoc: $tutorLoc, tutorCert: $tutorCert, tutorPic: $tutorPic, tutorPh: $tutorPh) {
      _id
      tutorAbout
      tutorLoc
      tutorCert
      tutorPic
      tutorPh
      tutorAuthor
      createdAt
      ratings {
        _id
        ratingText
      }
    }
  }
`;

export const UPDATE_TUTOR_PROFILE = gql`
	mutation updateTutor(
    $tutorId: ID!
    $tutorAbout: String!
    $tutorLoc: String
    $tutorCert: String
    $tutorPic: String
    $tutorPh: String
  ) {
		updateTutor(tutorId: $tutorId, tutorAbout: $tutorAbout, tutorLoc: $tutorLoc, tutorCert: $tutorCert, tutorPic: $tutorPic, tutorPh: $tutorPh) {
      _id
      tutorAbout
      tutorLoc
      tutorCert
      tutorPic
      tutorPh
      tutorAuthor
    }
	}
`;

export const ADD_RATING = gql`
  mutation addRating($tutorId: ID!, $ratingText: String!) {
    addRating(tutorId: $tutorId, ratingText: $ratingText) {
      _id
      tutorAbout
      tutorLoc
      tutorCert
      tutorPic
      tutorPh
      tutorAuthor
      createdAt
      ratings {
        _id
        ratingText
        createdAt
      }
    }
  }
`;

export const SAVE_TUTOR = gql`
  mutation saveTutor($tutorId: ID!) {
    saveTutor(tutorId: $tutorId) {
      _id
      email
      savedTutors {
        _id
        tutorAbout
        tutorLoc
        tutorCert
        tutorPic
        tutorPh
        tutorAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_SAVED_TUTOR = gql`
  mutation removeSavedTutor($tutorId: String!) {
    removeSavedTutor(tutorId: $tutorId) {
        _id
        email
        savedTutors {
          _id
          tutorAbout
          tutorLoc
          tutorCert
          tutorPic
          tutorPh
          tutorAuthor
          createdAt
        }
    }
  }
`;
