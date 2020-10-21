import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeView from './Components/Views/Home/Home';
import themes from './theme';

function App() {
  return (
    <MuiThemeProvider theme={themes.primary}>
      <CssBaseline />
      <ToastContainer draggablePercent={60} limit={3} />
      <HomeView />
    </MuiThemeProvider>
  );
}

export default App;
