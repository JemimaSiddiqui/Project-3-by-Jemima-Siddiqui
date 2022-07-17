import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, CardDeck, Card, CardHeader, CardBody, CardText, CardImg, CardFooter } from 'reactstrap';
// import FavouriteButton from '../FavouriteButton';
import './tutor.css';

const TutorList = ({
  tutors,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!tutors.length) {
    return <h3>No Tutors Added yet</h3>;
  }

  return (
    <Container>
      {showTitle && <h3>{title}</h3>}
      <Row xs="1" sm="1" md="2" lg="3">
            {tutors &&
              tutors.map((tutor) => (
                <div key={tutor._id}>
                  <Col>
                  <Card className="card">
                  <CardHeader className="card-header p-2 m-0">
                    {showUsername ? (
                      <Link
                        className="text-light"
                        to={`/tutors/${tutor._id}`}
                      >
                        {tutor.tutorAuthor} <br />
                        <span style={{ fontSize: '1rem' }}>
                          is available to tutoring near {tutor.tutorLoc}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <span style={{ fontSize: '1rem' }}>
                          You added yourself on {tutor.createdAt}
                        </span>
                      </>
                    )}
                  </CardHeader>
                  <CardBody className="card-body p-2">
                    <CardImg src={tutor.tutorPic} className="img" />
                    <CardText>About {tutor.tutorAuthor}: {tutor.tutorAbout}</CardText>
                    <CardText>Certifications Held: {tutor.tutorCert}</CardText>
                  </CardBody>
                  <CardFooter>
                    
                    <Link
                      className="btn"
                      to={`/tutors/${tutor._id}`}
                    >
                      See More
                    </Link>
                  </CardFooter>
                  </Card>
                  </Col>
                </div>
              ))}
      </Row>
    </Container>
  );
};

export default TutorList;
