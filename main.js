import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';

const coordinates = [];
const url = 'http://api.open-notify.org/iss-now.json';

const getIcon = () => {
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(coordinates)),
    name: 'iss'
  }); 
  const iconStyle = new Style({
    image: new Icon({
      src: 'img/iss.png',
    }),
  });
  iconFeature.setStyle(iconStyle);
  const iconSource = new VectorSource({
    features: [iconFeature],
  });
  return new VectorLayer({
    source: iconSource
  });
}

const getBackground = () => {
  return new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: './data/countries.json'
    })
  });
}

const getMap = () => {
  return new Map({
    layers: [getBackground(), getIcon()],
    target: document.getElementById('map'),
    view: new View({
      center: fromLonLat(coordinates),
      zoom: 2,
    }),
  });
}

const getData = async function ()  {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Something went wrong', err);
  }
}

const updateCoordinates = (data) => {
  const { iss_position : { latitude, longitude } } = data;
  coordinates[0] = longitude;
  coordinates[1] = latitude;
}

const updateMap = () => {
  const layers = map.getLayers().getArray();
  layers.pop();
  layers.push(getIcon());
  map.render();
}

// Initialise map then keep updating
let map;
getData().then((data) => {
  updateCoordinates(data);
  map = getMap();

  // Update every 5 seconds
  setInterval(() => {
    getData().then((data) => {
      updateCoordinates(data);
      updateMap();
    })
  }, 5000)
})