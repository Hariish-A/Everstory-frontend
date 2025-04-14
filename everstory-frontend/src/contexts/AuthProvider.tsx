import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import axiosInstance from "@/api/client";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuthenticated, setLoading } = useAuthStore();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8011/auth/verify-token");
        if (res?.message?.includes("successful")) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [setAuthenticated, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;
