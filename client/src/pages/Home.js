import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useQuery } from '@apollo/client';

import TutorList from '../components/TutorList';
import {FaQuestionCircle, FaHeart} from 'react-icons/fa'
import {HiCurrencyDollar} from 'react-icons/hi'


import { QUERY_TUTORS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TUTORS);
  const tutors = data?.tutors || [];

  return (
    <Container>
      <Row>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
              <Col className="ml-auto" >
                <Row>
                <Col className="col-md-2" >
                  <a href="/home">
                  <FaQuestionCircle className="icon"/>
                  </a>
                  </Col>
                  <Col className="col-md-10" >
                    <h3>Find tutors in your area</h3>
                    <p>
                      Check out our tutor profiles and see what other customers have to say.
                    </p>
                </Col>
                </Row>
                <Row>
                <Col className="col-md-2" >
                <a href="/saved">
                  <FaHeart className="icon"/>
                  </a>
                  </Col>
                  <Col className="col-md-10" >
                    <h3>Save your Favourites</h3>
                    <p>
                      Each time you find a tutor you like, save them to your favourites so that you can easily find and contact them again. 
                    </p>
                </Col>
                </Row>
                <Row>
                <Col className="col-md-2" >
                <a href="/register">
                  <HiCurrencyDollar className="icon"/>
                  </a>
                  </Col>
                  <Col className="col-md-10" >
                    <h3>Want to do some tutoring yourself?</h3>
                    <p>
                      Add your own profile so that other parents can easily find your and contact you through the website.
                    </p>
                  </Col>
                </Row>
                
              </Col>
              <Col className="ml-auto mr-auto" >
              <TutorList
                tutors={tutors}
                title="Tutors in your area"
              />
              </Col>
              </>
            )}
          </div>
      </Row>
    </Container>
  );
};

export default Home;
