import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      tutors {
        _id
        tutorAbout
        tutorLoc
        tutorCert
        tutorPic
        tutorPh
        createdAt
      }
    }
  }
`;
export const QUERY_TUTORS = gql`
  query getTutors{
    tutors {
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
`;

export const QUERY_SINGLE_TUTOR = gql`
  query getSingleTutor($tutorId: ID!) {
    tutor(tutorId: $tutorId) {
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
        ratingAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      tutors {
        _id
        tutorAbout
        tutorLoc
        tutorCert
        tutorPic
        tutorPh
        tutorAuthor
        createdAt
      }
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