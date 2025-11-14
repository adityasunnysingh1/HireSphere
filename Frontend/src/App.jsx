import { useUser } from "@clerk/clerk-react";
import {Navigate, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

import ProblemsPage from "./pages/ProblemsPage";
import { Toaster } from "react-hot-toast";
function App() {
  const { isSignedIn } = useUser();
  return (
    <>
    <Routes>
    {/* <Route path="/" element={<h1 className="text-red-500 bg-orange-400 p-10 text-3xl">Welcome to Vynterview platform</h1>} /> */}
    <Route path="/" element={<HomePage/>}/>
    <Route path="/problems" element={isSignedIn? <ProblemsPage/> : <Navigate to={"/"}/>}/>
    </Routes>
    <Toaster toastOptions={{ duration:4000 }}/>
    </>
  )
}
export default App;
