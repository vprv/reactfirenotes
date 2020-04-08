import React from 'react';
import './App.css';

import Main from './pages/Main';
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Main/>
    </UserProvider>
  );
}

export default App;
