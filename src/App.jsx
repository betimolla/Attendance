// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Home from "./pages/Home";
// import GeneralAdmin from "./pages/GeneralAdmin";






// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/general-admin" element={<GeneralAdmin />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import bgImage from './assets/background.png'
import './index.css'
import GeneralAdminPage from './pages/GeneralAdmin.jsx'

export default function App() {


  const navigate = useNavigate()

  return (

    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="flex flex-col items-center gap-6 w-[300px] p-8 backdrop-blur-md rounded-xl text-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} // 70% white
      >
        <img src={logo} alt="Logo" className="w-40 h-40 object-contain mb-4" />

        <div className="flex flex-col gap-4 w-full">

          <button
            onClick={() => navigate('/admin')}
            className="w-full border border-[#D7B450] text-white py-3 px-3 rounded-md text-base transition duration-200 hover:text- hover:bg-yellow-400"
          >
            Login as General Admin
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full border border-[#D7B450] text-white py-3 rounded-md text-base transition duration-200 hover:bg-yellow-400 hover:text-black hover:scale-105"
          >
            Login as Session Admin
          </button>
        </div>

        <p className="text-white text-sm mt-2 cursor-pointer hover:underline">
          Create Account
        </p>
      </div>
    </div>
  )
}



