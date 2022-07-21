import React from 'react';
import { Row, Container, Col, Card, CardTitle, CardBody, CardText, Button, CardImg } from 'reactstrap';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_SAVED_TUTOR } from '../utils/mutations'
import { QUERY_ME } from '../utils/queries'

const SavedTutors = () => {
  const [removeSavedTutor, { error }] = useMutation(REMOVE_SAVED_TUTOR);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleDeleteTutor = async (tutorId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

      await removeSavedTutor({
        variables: { tutorId }
      });

      if (error) {
        throw new Error('something went wrong!');
      }
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <Row>
          <h2>
            {userData.savedTutors?.length
              ? `Viewing ${userData.savedTutors.length} saved ${userData.savedTutors.length === 1 ? 'tutor' : 'tutors'}:`
              : 'You have no saved tutors.'}
          </h2>
        </Row>
        <Row xs="1" sm="1" md="2">
          {userData.savedTutors.map((tutor) => {
            
              return (
              <Col>
              <Card key={tutor._id} border='dark' className="card">
                {tutor.tutorPic ? <CardImg src={tutor.tutorPic} alt={`The cover for ${tutor.tutorAuthor}`} className="img" variant='top' /> : null}
                <CardBody>
                  <CardTitle>
                    Name:  {tutor.tutorAuthor}
                  </CardTitle>
                  <CardText>{tutor.tutorAbout}</CardText>
                  <Button className='btn' onClick={() => handleDeleteTutor(tutor._id)}>
                    Delete this tutor!
                  </Button>
                </CardBody>
              </Card>
              </Col>
              );
            
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedTutors;
