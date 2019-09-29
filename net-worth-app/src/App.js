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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <NavBar />
      <TableList />
    </div>
  );
}

export default App;
