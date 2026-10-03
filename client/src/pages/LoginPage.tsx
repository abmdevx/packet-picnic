import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const googleInitialized = useRef(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !window.google ||
      !googleButtonRef.current ||
      googleInitialized.current
    ) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response) => {
        try {
          await login(response.credential);

          navigate("/dashboard", {
            replace: true,
          });
        } catch (error) {
          console.error("Google login failed:", error);
        }
      },
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      type: "standard",
      theme: "filled_black",
      size: "large",
      text: "continue_with",
      shape: "circle",
      logo_alignment: "left",
      width: 384,
    });

    googleInitialized.current = true;
  }, [login, navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-6">
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute left-6 top-6 inline-flex items-center text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      {/* Login Content */}
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={`https://res.cloudinary.com/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload/v1790490826/logo_yz7vqp.png`}
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

        {/* Google Login */}
        <div className="mt-6 flex justify-center">
          <div ref={googleButtonRef} />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;