import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import AddProductForm from "./components/Admindashboard/AddProductForm.jsx"
import NotFound from "./pages/NotFound.jsx";
import ListTask  from "./components/Admindashboard/ListTask.jsx";
import EditProductForm from "./components/Admindashboard/EditProductForm.jsx"; // Import the EditProduct component


import Blog from './pages/Blog.jsx';
import Footer from './components/Footer/Footer.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Signin/Signin.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Categories from './components/Categories/Categories.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        
        <AuthProvider>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<ProtectedRoute> <AddProductForm /> </ProtectedRoute>} />
          <Route path="/listproducts" element={<ProtectedRoute> <ListTask/> </ProtectedRoute>}/>
          <Route path="/listproducts/edit/:tid" element={<EditProductForm/>}/>
          <Route path="/login" element={<Login />}  />
          <Route path="/register" element={<Register />} />
   
          <Route path="/categories/:cat" element={<Categories />} /> {/* Route with dynamic parameter */}
          <Route path="/categories" element={<Categories />} /> 
          <Route path="/blog" element={<Blog />} /> 
          <Route path="*" element={<NotFound />} />
          
        </Routes>
        <Footer />
        </AuthProvider>
      </Container>
    </div>
  );
}

export default App;
