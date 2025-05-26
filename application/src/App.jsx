import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import Programmi from './pages/Programmi/Programmi';
import ProgramDetail from './pages/Programmi/components/ProgramDetail';

function App() {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
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
