import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './bootstrap/Wrapper/Wrapper';

ReactDOM.hydrate(
  <BrowserRouter>
    <Wrapper />
  </BrowserRouter>,
  document.getElementById('app'),
);
