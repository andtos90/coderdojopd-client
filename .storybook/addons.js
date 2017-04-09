// addons.js
import '@kadira/storybook/addons';
import '@kadira/storybook-addon-knobs/register'
import 'react-storybook-addon-backgrounds/register';
import registerScissors, { defaultDevices } from 'storybook-addon-scissors';

const devices = [
  //...defaultDevices,
  {
    name: 'Mobile Small',
    width: 320,
    height: 568
  },
  {
    name: 'Mobile Large',
    width: 360,
    height: 640
  },
  {
    name: 'Tablet Portrait',
    width: 768,
    height: 1024
  },
  {
    name: 'Tablet Landscape',
    width: 1024,
    height: 768
  },
  {
    name: 'Desktop Small',
    width: 1366,
    height: 768
  },
  {
    name: 'Desktop Large',
    width: 1920,
    height: 1080
  }
];

registerScissors(devices);