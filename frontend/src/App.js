import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import DisplayProducts from "./pages/DisplayProducts";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/navbar/Navbar";
import SeeProduct from "./pages/SeeProduct";
import "./App.css";
function App() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />  
          <Route path="/displayproducts" element={<DisplayProducts />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product/:id" element={<SeeProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
