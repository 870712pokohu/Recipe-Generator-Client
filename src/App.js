import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div class="relative bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl">
      <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route
              path = '/'
              element = {<HomePage/>}
            />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
