import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Character from './components/Character';
import { RecoilRoot } from 'recoil';
import Clothes from "./components/Clothes";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Character />
      <Clothes />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
