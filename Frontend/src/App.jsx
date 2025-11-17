import { useUser } from "@clerk/clerk-react";
import { Navigate, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import { Toaster } from "react-hot-toast";
function App() {
  const { isSignedIn, isLoaded } = useUser();
  //This will get rid of the flickering effect
  if (!isLoaded) return null;
  return (
    <>
    <Routes>
    {/* <Route path="/" element={<h1 className="text-red-500 bg-orange-400 p-10 text-3xl">Welcome to Vynterview platform</h1>} /> */}
    <Route path="/" element={!isSignedIn? <HomePage/> : <Navigate to={"/dashboard"}/>}/>
    <Route path="/dashboard" element={isSignedIn? <DashboardPage/> : <Navigate to={"/"}/>}/>
    <Route path="/problems" element={isSignedIn? <ProblemsPage/> : <Navigate to={"/"}/>}/>
    <Route path="/problem/:id" element={isSignedIn? <ProblemPage/> : <Navigate to={"/"}/>}/>
    </Routes>
    <Toaster toastOptions={{ duration:4000 }}/>
    </>
  )
}
export default App;
