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


const iconFeature = new Feature({
  geometry: new Point([0, 0]),
  // name: 'Null Island',
  // population: 4000,
  // rainfall: 500,
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'img/iss.png',
  }),
});

iconFeature.setStyle(iconStyle);

const iconSource = new VectorSource({
  features: [iconFeature],
});

const iconLayer = new VectorLayer({
  source: iconSource,
});

const backgroundLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: './data/countries.json'
  })
});

const map = new Map({
  layers: [backgroundLayer, iconLayer],
  target: document.getElementById('map'),
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
