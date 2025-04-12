import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/everstory-logo.png";
import BrownButton from "@/pages/landing/components/BrownButton";
import LoadingSpinner from "@/pages/landing/components/LoadingSpinner";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center space-y-6"
      style={{ backgroundColor: "#fdfaf6" }}
    >
      <img
        src={logo}
        alt="Everstory Logo"
        className="w-40 h-40 sm:w-44 sm:h-44"
      />

      {!showButton ? (
        <LoadingSpinner />
      ) : (
        <div className="animate-fade-slow">
          <BrownButton onClick={() => navigate("/login")}>
            Let’s Get Started
          </BrownButton>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
