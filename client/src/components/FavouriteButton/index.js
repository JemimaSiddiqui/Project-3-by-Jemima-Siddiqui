import React, { useState, useEffect } from 'react';
import {FaHeart} from 'react-icons/fa'
import { saveTutorIds, getSavedTutorIds } from '../../utils/localStorage';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_TUTOR } from '../../utils/mutations'
import Auth from '../../utils/auth';
import { QUERY_SINGLE_TUTOR } from '../../utils/queries';

const FavouriteButton = () => {
    const [saveTutor, { error }] = useMutation(SAVE_TUTOR);


    const [savedTutorIds, setSavedTutorIds] = useState(getSavedTutorIds());

    useEffect(() => {
        return () => saveTutorIds(savedTutorIds);
    });

    const { tutorId } = useParams();

    const { data } = useQuery(QUERY_SINGLE_TUTOR, {
 
        variables: { tutorId: tutorId },
    });
    console.log(tutorId)
    const tutor = data?.tutor || {};


    const handleSaveTutor = async () => {

        const tutorId = data.tutor._id
        console.log(tutorId)

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {

            await saveTutor({
                variables: { tutorId }
            });

            if (error) {
                throw new Error('something went wrong!');
            }

            setSavedTutorIds([...savedTutorIds, tutorId]);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            {Auth.loggedIn() && (
                <FaHeart 
                    disabled={savedTutorIds?.some((savedTutorId) => savedTutorId === tutor.tutorId)}
                    className='icon'
                    onClick={() => handleSaveTutor(tutor.tutorId)}
                />
            )}
        </>
    );
};

export default FavouriteButton;