import { useState } from 'react'
import './App.css'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const App = () => {

  return (
    <>
      <Header />
      <Main />
      <Footer/>
    </>
  )
}

export default App
