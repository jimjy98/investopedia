import React from 'react';
import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material'
import { initializeApp } from "firebase/app";

import { App } from "./App";
import { theme } from "./theme";

import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyBfNmDwArkKXy3VGeyayp-ssVO-C6f5H7Y",
  authDomain: "investopedia-7d0da.firebaseapp.com",
  projectId: "investopedia-7d0da",
  storageBucket: "investopedia-7d0da.appspot.com",
  messagingSenderId: "416643901328",
  appId: "1:416643901328:web:96549025ca1c4ccd103515"
};

initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>,
  rootElement
);