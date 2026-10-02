import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { FaGoogle, FaGithub, FaXTwitter } from "react-icons/fa6";

const LoginPage = () => {

  const googleInitialized = useRef(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (!window.google || googleInitialized.current) {
    return;
  }
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response) => {
        await login(response.credential);
        navigate("/dashboard", { replace: true });
      },
    });

    googleInitialized.current = true;
  }, [login]);

  const handleGoogleLogin = () => {
    window.google.accounts.id.prompt();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        {/* Back */}
        <Link
          to="/"
          className="mb-10 inline-flex items-center text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`}
            alt="Packet Picnic"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to Packet Picnic
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Choose how you'd like to continue.
          </p>
        </div>

        {/* Login Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            variant="outline"
            className="h-11 w-full justify-center"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="mr-3 h-4 w-4" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="h-11 w-full justify-center"
            onClick={() => {
              console.log("GitHub login coming soon");
            }}
          >
            <FaGithub className="mr-3 h-4 w-4" />
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="h-11 w-full justify-center"
            onClick={() => {
              console.log("X login coming soon");
            }}
          >
            <FaXTwitter className="mr-3 h-4 w-4" />
            Continue with X
          </Button>
        </div>

        {/* Guest */}
        <div className="mt-8 text-center">
          <Link
            to="/upload"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Continue without an account
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;