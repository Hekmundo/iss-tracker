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

const addHeaderText = () => {
  const text = document.createTextNode('REAL-TIME ISS LOCATION');
  const header = document.getElementById('header');
  header.appendChild(text);
};

// Initialise map then keep updating
let map;
getData().then((data) => {
  updateCoordinates(data);
  map = getMap();
  addHeaderText();

  // Update every 5 seconds
  setInterval(() => {
    getData().then((data) => {
      updateCoordinates(data);
      updateMap(map);
    });
  }, 5000);
});
