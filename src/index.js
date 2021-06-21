import { updateMap, getMap, updateCoordinates } from './map.utils';

const getData = async function () {
  try {
    const response = await fetch(
      'https://api.wheretheiss.at/v1/satellites/25544'
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Couldn't fetch coordinates", err);
  }
};

// Initialise map then keep updating
let map;
document.getElementById('header').style.display = 'block';
getData().then((data) => {
  updateCoordinates(data);
  document.getElementById('map').style.display = 'block';
  map = getMap();

  // Update every 5 seconds
  setInterval(() => {
    getData().then((data) => {
      updateCoordinates(data);
      updateMap(map);
    });
  }, 5000);
});
