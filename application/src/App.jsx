import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import Programmi from './pages/Programmi/Programmi';
import ProgramDetail from './pages/Programmi/components/ProgramDetail';
import { useState } from 'react'; // Import aggiunto

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex">
        <SideBar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
        <main className={`flex-1 bg-gray-50 min-h-screen transition-all duration-300 ${
          isSidebarOpen 
            ? 'ml-64' // 256px quando aperto
            : 'ml-20' // 80px quando chiuso
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