<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
>>>>>>> branch 'develop' of https://lab.ssafy.com/s04-final/s04p31a301.git

import './index.css';
import App from './App';

<<<<<<< HEAD
import store from './redux/store';

=======
>>>>>>> branch 'develop' of https://lab.ssafy.com/s04-final/s04p31a301.git
ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
<<<<<<< HEAD
  </Provider>,
  document.getElementById('root')
=======
  </AuthContextProvider>,
  document.getElementById("root")
>>>>>>> branch 'develop' of https://lab.ssafy.com/s04-final/s04p31a301.git
);
