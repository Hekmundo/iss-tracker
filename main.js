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

let coordinates = [0,0];

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

const initialize = () => {
  fetch('http://api.open-notify.org/iss-now.json')
    .then((response) => response.json())
    .then((data) => {
      const { iss_position : { latitude, longitude } } = data;
      coordinates[0] = longitude 
      coordinates[1] = latitude;
      console.log(coordinates);
      map = getMap();
    })
}

const updateMap = () => {
  setTimeout(() => {
    fetch('http://api.open-notify.org/iss-now.json')
    .then((response) => response.json())
    .then((data) => {
      const { iss_position : { latitude, longitude } } = data;
      coordinates = [longitude, latitude];
      console.log(coordinates);

      const layers = map.getLayers().getArray();
      layers.pop();
      layers.push(getIcon());

      map.render();
      updateMap(); // re-run update
    })
  }, 5000)
}

let map;
initialize();
updateMap();