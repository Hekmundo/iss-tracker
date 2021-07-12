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
getData().then((data) => {
  updateCoordinates(data);
  map = getMap();
  map.once('postrender', () => {
    document.getElementById('header').style.display = 'block';
    setTimeout(() => {
      document.getElementById('map').style.border = '3px black solid';
      document.getElementById('clouds').style.display = 'none';
    }, 2000);
  });

  // Update every 5 seconds
  setInterval(() => {
    getData().then((data) => {
      updateCoordinates(data);
      updateMap(map);
    });
  }, 5000);
});
