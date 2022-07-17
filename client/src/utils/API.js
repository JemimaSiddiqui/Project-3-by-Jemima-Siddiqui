export const searchPostcode = (query) => {
    return fetch(`http://v0.postcodeapi.com.au/suburbs/${query}.json -H 'Accept: application/json; indent=4`);
  };