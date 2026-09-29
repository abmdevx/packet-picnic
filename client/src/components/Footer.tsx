import { Link } from "react-router-dom";
import {
  Mail,
  ArrowUpRight,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

const LOGO_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`;

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <img
                src={LOGO_URL}
                alt="Packet Picnic"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Simple, secure file sharing without the unnecessary complexity.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              <SocialLink
                href="https://github.com/abmdevx"
                label="GitHub"
              >
                <FaGithub className="h-4 w-4" />
              </SocialLink>

              <SocialLink
                href="https://www.linkedin.com/in/abdullah-bin-mughira/"
                label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </SocialLink>

              <SocialLink
                href="mailto:abdullahbuttdevx@gmail.com"
                label="Email"
              >
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#features"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                How it works
              </a>

              <Link
                to="/login"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold">Connect</h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://github.com/abmdevx/packet-picnic"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub Repository
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="mailto:abdullahbuttdevx@gmail.com"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Packet Picnic. All rights reserved.
          </span>

          <span>Built with React & TypeScript</span>
        </div>
      </div>
    </footer>
  );
};

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

const SocialLink = ({
  href,
  label,
  children,
}: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  );
};

export default Footer;