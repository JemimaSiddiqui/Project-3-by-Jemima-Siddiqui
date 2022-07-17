import React, { useState, useEffect } from 'react';
import { Form, Input } from 'reactstrap';

const Location = ({ handleChange, formState, setFormState }) => {

  const [suburbs, setSuburbs] = useState([]);

  const [search, setSearch] = useState('');
  const updateLocation = (loc) => {
    console.log(loc)
    setFormState({
      ...formState,
      tutorLoc: loc
    })
  }

  const searchPostcode = async (searchTerm) => {
    const url = `https://cors-anywhere.herokuapp.com/http://api.geonames.org/postalCodeSearchJSON?postalcode=${searchTerm}&maxRows=15&username=catormerod`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setSuburbs(responseJson.postalCodes);
      if (responseJson.postalCodes.length>0) updateLocation(responseJson.postalCodes[0].placeName+', '+responseJson.postalCodes[0].postalCode);
    }
  };

  useEffect(() => {
    if (search)  searchPostcode(search);
  }, [search]);

  return (
    <>
      <Form>
        
        <Input
          name="tutorLoc"
          placeholder="Enter your postcode"
          className="form-input w-100"
          style={{ lineHeight: '1.5', resize: 'vertical' }}
          onBlur={(e) => setSearch(e.target.value)}
          onChange={handleChange}
        />
      </Form>
      {suburbs?.length ? <div>
        <select onChange={e => updateLocation(e.target.value)}>
          {suburbs.map(suburb => (
            <option value={suburb.placeName + ', ' + suburb.postalCode} >
              {suburb.placeName} {suburb.postalCode}
            </option>
          )
          )}
        </select>
      </div> : null}
    </>
  );
};

export default Location;