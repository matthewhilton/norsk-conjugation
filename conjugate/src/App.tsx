import React from 'react';
import './App.css';

import { DataProvider } from "./context/dataContext"
import Quiz from './components/quiz';


function App() {
  return (
    <DataProvider>
      <Quiz />
    </DataProvider>
  );
}

export default App;
