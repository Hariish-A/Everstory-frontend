import { FcGoogle } from "react-icons/fc";

const SocialLogin: React.FC = () => {
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: integrate OAuth2 flow
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 bg-black/50 text-white font-medium rounded-md border border-emerald-500/50 hover:bg-emerald-500/10 transition duration-300 flex items-center justify-center gap-2"
      >
        <FcGoogle className="w-6 h-6" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
