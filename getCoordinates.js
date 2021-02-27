const getCoordinates = async function () {
  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json');
    const { iss_position : { latitude, longitude } } = await response.json();
    return [longitude, latitude];
  } catch (err) {
    console.log('Something went wrong', err);
  }
}

export default getCoordinates;