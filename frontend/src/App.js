import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrandCarsPage from './pages/BrandCarsPage';
import ContractsPage from './pages/ContractsPage';
import './styles/main.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brand/:brandId" element={<BrandCarsPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
      </Routes>
    </Router>
  );
}

export default App;