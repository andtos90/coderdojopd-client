import { configure, addDecorator } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import backgrounds from "react-storybook-addon-backgrounds";

import 'src/styles/globals.css';

const req = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(withKnobs);
addDecorator(backgrounds([
    { name: "gray", value: "#aaaaaa", default: true },
    { name: "white", value: "#ffffff" },
    { name: "black", value: "#000000" },
  ]));
 
configure(loadStories, module);
