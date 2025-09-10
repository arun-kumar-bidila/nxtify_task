import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import DisplayProducts from "./pages/DisplayProducts";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar/Navbar";
import SeeProduct from "./pages/SeeProduct";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Landing page → Home */}
        <Route path="/" element={<Home />} />  
        <Route path="/displayproducts" element={<DisplayProducts />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/product/:id" element={<SeeProduct />} />
      </Routes>
    </>
  );
}

export default App;
