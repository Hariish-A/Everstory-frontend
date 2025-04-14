import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage.tsx";
import HomePage from "./pages/auth/Login.tsx";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import UserForYou from "./pages/home/UserForYou";
import FriendPage from "@/pages/friend/FriendPage";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";
import OtherUserProfile from "@/pages/profile/OtherUserProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/for-you" element={<UserForYou />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/:id" element={<OtherUserProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
