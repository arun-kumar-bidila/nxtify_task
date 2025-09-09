import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import DisplayProducts from './Pages/DisplayProducts'; // adjust path
import AddProduct from './Pages/AddProduct'; // adjust path

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<DisplayProducts />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
