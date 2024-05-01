import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './components/AboutPage'; // About sayfasının bileşeni
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className=' outerdiv '>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<Home />} />
          {/* Diğer sayfa yönlendirmeleri buraya eklenir */}
        </Routes>
      </Router>
    </div>

  );
}

export default App;
