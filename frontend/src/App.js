import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import DisplayProducts from "./Pages/DisplayProducts";
import AddProduct from "./Pages/AddProduct";
import Navbar from "./components/navbar/Navbar";
import SeeProduct from "./Pages/SeeProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        position="top-center"   
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"          
        toastClassName="custom-toast"  
      />

    </>
  );
}

export default App;
