import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, CardTitle, CardBody, CardImg, Card } from 'reactstrap';
import { saveTutorIds, getSavedTutorIds } from '../utils/localStorage';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import RatingList from '../components/RatingList';
import RatingForm from '../components/RatingForm';
import SMSForm from '../components/SMSForm';
import { SAVE_TUTOR } from '../utils/mutations'
import Auth from '../utils/auth';
import { QUERY_SINGLE_TUTOR } from '../utils/queries';

const SingleTutor = () => {
  const [saveTutor, { error }] = useMutation(SAVE_TUTOR);

  // create state to hold saved bookId values
  const [savedTutorIds, setSavedTutorIds] = useState(getSavedTutorIds());

  useEffect(() => {
    return () => saveTutorIds(savedTutorIds);
  });
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { tutorId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_TUTOR, {
    // pass URL parameter
    variables: { tutorId: tutorId },
  });
  const tutor = data?.tutor || {};

  // create function to handle saving a book to our database
  const handleSaveTutor = async () => {
    // find the book in `searchedBooks` state by the matching id
    const tutorId = data.tutor._id
    console.log(tutorId)
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //console.log('testing line 52');
      const datab = await saveTutor({
        variables: { tutorId }
      });
console.log(datab);
      if (error) {
        throw new Error('something went wrong!');
      }
      setSavedTutorIds([...savedTutorIds, tutorId]);
      window.location.reload()
    } catch (err) {
      
      console.error(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

    <Container>
      <Card style={{ maxWidth: '400px', textAlign: 'center' }}>
        <CardImg top width="90%" src={tutor.tutorPic} alt="" className='img' style={{ width: '90%', maxWidth: '250px', textAlign: 'center' }} />
        <CardTitle tag="h3" >
          {tutor.tutorAuthor} <br />
        </CardTitle>
        <CardBody >
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              lineHeight: '1.5',
            }}
          >
            {tutor.tutorAbout}
          </blockquote>
        </CardBody>
        {Auth.loggedIn() && (
          <Button
            disabled={savedTutorIds?.some((savedTutorId) => savedTutorId === tutor.tutorId)}
            className='btn-block btn-info'
            onClick={() => handleSaveTutor(tutor.tutorId)}>
            {savedTutorIds?.some((savedTutorId) => savedTutorId === tutor.tutorId)
              ? 'This tutor has already been saved!'
              : 'Save this Tutor!'}
          </Button>
        )}
        <SMSForm 
        tutorPh={tutor.tutorPh}
        tutorAuthor={tutor.tutorAuthor}
         />
        <div className="my-5">
          <RatingList ratings={tutor.ratings} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
          <RatingForm tutorId={tutor._id} />
        </div>
      </Card>
    </Container>
  );
};

export default SingleTutor;
