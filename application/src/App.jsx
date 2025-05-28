import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import Programmi from './pages/Programmi/Programmi';
import ProgramDetail from './pages/Programmi/components/ProgramDetail';
import { useState } from 'react'; // Aggiunto

function App() {
  // Stato condiviso tra SideBar e App
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex">
        {/* Passa lo stato e setter alla SideBar */}
        <SideBar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
        
        {/* Margine dinamico basato su isSidebarOpen */}
        <main className={`flex-1 bg-gray-50 min-h-screen transition-all duration-300 ${
          isSidebarOpen 
            ? 'ml-64 md:ml-64' // Margine quando sidebar è aperta
            : 'ml-20 md:ml-20'  // Margine quando sidebar è chiusa
        }`}>
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