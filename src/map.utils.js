import './style.scss';
import IssImage from './assets/iss.png';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import { Stamen, Vector as VectorSource, XYZ } from 'ol/source';
import View from 'ol/View';
import { Icon, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';

const coordinates = []; // Coordinates of ISS position

const getIcon = () => {
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(coordinates)),
  });

  const iconStyle = new Style({
    image: new Icon({
      src: IssImage,
    }),
  });

  iconFeature.setStyle(iconStyle);

  const iconSource = new VectorSource({
    features: [iconFeature],
  });

  return new VectorLayer({
    source: iconSource,
  });
};

const getLabels = () => {
  return new TileLayer({
    source: new Stamen({
      layer: 'terrain-labels',
    }),
  });
};

const getMapBackground = () => {
  return new TileLayer({
    source: new XYZ({
      url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=m6j393S1kCtixGAioJhX',
      maxZoom: 20,
    }),
  });
};

export const getMap = () => {
  return new Map({
    layers: [getMapBackground(), getLabels(), getIcon()],
    target: 'map',
    view: new View({
      center: fromLonLat(coordinates),
      zoom: 3,
    }),
  });
};

export const updateCoordinates = ({ latitude, longitude }) => {
  coordinates[0] = longitude;
  coordinates[1] = latitude;
};

export const updateMap = (map) => {
  const layers = map.getLayers().getArray();
  layers.pop();
  layers.push(getIcon());
  map.render();
};
