import './App.css';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
function App() {
  return (
    <>
    <h1>Welcome to Vynterview platform</h1>
    <SignedOut>
      <SignInButton mode='modal'>
        <button>Login</button>
      </SignInButton>
    </SignedOut>  
    <SignedIn>
      <UserButton />
    </SignedIn>
    </>
  )
}
export default App;
