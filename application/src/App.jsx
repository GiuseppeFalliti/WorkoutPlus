import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import Programmi from './pages/Programmi/Programmi';
import ProgramDetail from './pages/Programmi/components/ProgramDetail';
import { useState, useEffect } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Rileva il cambio dimensione finestra per determinare se siamo in modalità mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-gestione stato sidebar su resize
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Imposta lo stato iniziale

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcola la classe del margine in base allo stato
  const getMarginClass = () => {
    if (isMobile) {
      return isSidebarOpen ? 'ml-44' : 'ml-0';
    } else {
      return isSidebarOpen ? 'ml-64' : 'ml-20';
    }
  };

  return (
    <Router>
      <div className="flex">
        <SideBar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          isMobile={isMobile}
        />
        
        <main className={`flex-1 bg-gray-50 min-h-screen transition-all duration-300 ${getMarginClass()}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programmi" element={<Programmi />} />
            <Route path="/programmi/:id" element={<ProgramDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;