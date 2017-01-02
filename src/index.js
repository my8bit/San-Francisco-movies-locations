import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Main} from './app/main';
import 'material-design-lite/dist/material.blue-orange.min.css';
import 'getmdl-select/getmdl-select.min.css';
import 'material-design-lite';
import 'getmdl-select/getmdl-select.min.js';
import './index.scss';

render(
  <Main/>,
  document.getElementById('root')
);
