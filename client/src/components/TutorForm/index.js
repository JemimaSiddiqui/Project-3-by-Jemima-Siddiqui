import React, { useState } from 'react';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_TUTOR, UPDATE_TUTOR_PROFILE } from '../../utils/mutations';
import { QUERY_TUTORS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ImageUpload from '../ImageUpload';
import Location from '../Location';
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

const TutorForm = () => {
  const [formState, setFormState] = useState({
    tutorAbout: '',
    tutorLoc: '',
    tutorCert: '',
    tutorPic: '',
    tutorPh: '',
  });

  const [addTutor, { error }] = useMutation(ADD_TUTOR, {
    update(cache, { data: { addTutor } }) {
      try {
        const { tutors } = cache.readQuery({ query: QUERY_TUTORS });

        cache.writeQuery({
          query: QUERY_TUTORS,
          data: { tutors: [addTutor, ...tutors] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, tutors: [...me.tutors, addTutor] } },
      });
    },
  });
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTutor({
        variables: {
          tutorAbout: formState.tutorAbout,
          tutorLoc: formState.tutorLoc,
          tutorCert: formState.tutorCert,
          tutorPic: formState.tutorPic,
          tutorPh: formState.tutorPh,
          tutorAuthor: Auth.getProfile().data.firstName,
          tutorFirst: Auth.getProfile().data.firstName,
          tutorLast: Auth.getProfile().data.lastName,
          tutorEmail: Auth.getProfile().data.email,
        },
      });
      setFormState({
        tutorAbout: '',
        tutorLoc: '',
        tutorCert: '',
        tutorPic: '',
        tutorPh: '',
      });
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(formState)
  return (
    <>
      <h3>Details of your profile</h3>

      {Auth.loggedIn() ? (
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <Form
                className='tutor-form'
                onSubmit={handleFormSubmit}>
                <Row>
                  <h4 className="title">
                    <small>Profile Pic</small>
                  </h4>
                  <ImageUpload avatar
                    setFormState={setFormState}
                    name="tutorPic"
                  />
                </Row>
                <Row>
                  <Col md="6" sm="6">
                    <AvForm>
                      <label htmlFor='form-ph'>Phone Number:</label>
                      <AvField
                        name="tutorPh"
                        placeholder="+61 XXX XXX XXX"
                        validate={{ pattern: { value: /^(\+(614))([0-9]{8})$/, errorMessage: 'You must enter an Australian Mobile Phone number in exact format +614XXXXXXXX' } }}
                        onChange={handleChange}
                      />
                    </AvForm>
                  </Col>
                  <Col md="6" sm="6">
                    <FormGroup>
                      <label htmlFor='form-location'>Post Code</label>
                      <Location
                        handleChange={handleChange}
                        formState={formState}
                        setFormState={setFormState} />
                    </FormGroup>
                  </Col>
                </Row>
                <AvForm>
                  <label htmlFor='form-cert'>Certificates</label>
                  <AvField
                    name="tutorCert"
                    placeholder="e.g. WWCC, First Aid, Police Check, Early-Childhood Degree"
                    onChange={handleChange}
                    />
                </AvForm>
                <FormGroup>
                  <label htmlFor='form-about'>About</label>
                  <Input
                    name="tutorAbout"
                    placeholder="Tell us all about yourself."
                    className="textarea"
                    rows="3"
                    onChange={handleChange}
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="btn-wd btn-round"
                    color="info"
                    type="submit"
                  >
                    Save
                  </Button>
                  {/* <Button
                    className="btn-wd btn-round"
                    outline
                    color="info"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button> */}
                </div>
              </Form>
            </Col>
          </Row>
          {error && (
            <div className="col-12 my-3 p-3">
              {error.message}
            </div>
          )}
        </Container>
      ) : (
        <p>
          You need to be logged in to add yourself to our database. Please{' '}
          <Link to="/login">login</Link> or <Link to="/register">register.</Link>
        </p>
      )}
    </>

  );
};
export default TutorForm;
