import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import DisplayProducts from "./Pages/DisplayProducts";
import AddProduct from "./Pages/AddProduct";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Landing page → Home */}
        <Route path="/" element={<Home />} />  
        <Route path="/displayproducts" element={<DisplayProducts />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
