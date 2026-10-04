import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const LOGO_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src={LOGO_URL}
            alt="Packet Picnic"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* 404 */}
        <div>
          <h1 className="text-7xl font-bold tracking-tight">
            404
          </h1>

          <h2 className="mt-3 text-xl font-semibold">
            Page not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-center gap-2">
          <Button onClick={() => navigate("/")}>
            <Home className="mr-2 size-4" />
            Go Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-[11px] text-muted-foreground/60">
          Fast file sharing, without the hassle.
        </footer>
      </div>
    </main>
  );
};

export default NotFoundPage;