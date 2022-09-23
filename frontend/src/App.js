import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./Routes/DefaultLayout";
import Login from "./Login/Login";
import SignUp from "./Signup/SignUp";
import Adminlogin from "./Admin/Adminlogin";
import AdminsignUp from "./Admin/Adminsignup";

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="*" element={<DefaultLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/signup" element={<SignUp />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/adminlogin/adminsignup" element={<AdminsignUp />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
