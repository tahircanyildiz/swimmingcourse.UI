import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
//import Calendar from '../shared/Calendar'
import Landingpage from './Landingpage';
import AboutPage from './AboutPage';
import Contact from './Contact';
import Footer from './Footer';
import Coach from './Coach';

function Home() {
  const [pagenum, setPagenum] = useState(0);
  return (
    <div className=' flex flex-col h-full w-full' >
      <Navbar setPagenum={setPagenum} pageNum={pagenum} />
      <Landingpage setPagenum={setPagenum} />
      <AboutPage />
      <Coach/>
      <Contact />
       
    </div>
  )
}

export default Home;