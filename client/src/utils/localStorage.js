export const getSavedTutorIds = () => {
    const savedTutorIds = localStorage.getItem('saved_tutors')
      ? JSON.parse(localStorage.getItem('saved_tutors'))
      : [];
  
    return savedTutorIds;
  };
  
  export const saveTutorIds = (tutorIdArr) => {
    if (tutorIdArr.length) {
      localStorage.setItem('saved_tutors', JSON.stringify(tutorIdArr));
    } else {
      localStorage.removeItem('saved_tutors');
    }
  };
  
  export const removeTutorId = (tutorId) => {
    const savedTutorIds = localStorage.getItem('saved_tutors')
      ? JSON.parse(localStorage.getItem('saved_tutors'))
      : null;
  
    if (!savedTutorIds) {
      return false;
    }
  
    const updatedSavedTutorIds = savedTutorIds?.filter((savedTutorId) => savedTutorId !== tutorId);
    localStorage.setItem('saved_tutors', JSON.stringify(updatedSavedTutorIds));
  
    return true;
  };
  