import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import TableList from './components/TableList'

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <NavBar />
      <TableList />
    </div>
  );
}

export default App;
