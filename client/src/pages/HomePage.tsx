import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  File,
  FileImage,
  FileText,
  Link2,
  Loader2,
  Lock,
  Share2,
  Upload,
  Zap,
} from "lucide-react";
import Typewriter from "typewriter-effect";

import { Button } from "@/components/ui/button";

const LOGO_URL =
  `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1790490826/logo_yz7vqp.png`;

const HomePage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <img
              src={LOGO_URL}
              alt="Packet Picnic"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </a>
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
            <a
              href="#contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="sm:h-10 sm:px-4">
                <span className="sm:hidden">Start</span>
                <span className="hidden sm:inline">Get Started</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-87.5 w-[90%] max-w-175 -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] sm:h-125" />

        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center rounded-full border bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur sm:text-sm">
                <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Simple. Secure. File sharing.
              </div>

              <h1 className="text-4xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Share anything.
                <br />
                <span className="text-muted-foreground">
                  Send it anywhere.
                </span>
              </h1>

              <div className="mt-6 flex items-center justify-center text-base font-medium sm:text-xl lg:justify-start">
                <span className="mr-2 text-muted-foreground">Just</span>
                <span className="text-primary">
                  <Typewriter
                    options={{
                      strings: [
                        "upload it.",
                        "share it.",
                        "copy the link.",
                        "get it done.",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 65,
                      deleteSpeed: 35,
                    }}
                  />
                </span>
              </div>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0">
                Packet Picnic gives you a simple way to upload, store, and
                share your files. No complicated workflow. Just your file and
                a link.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link to="/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Sharing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </a>
              </div>
            </div>

            {/* Animated File Network — hidden on small phones, shown from sm up */}
            <div className="relative mx-auto hidden h-95 w-full max-w-140 sm:block lg:h-107.5">
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-muted-foreground/20" />
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted-foreground/10" />

              <div className="absolute left-[22%] top-1/2 h-px w-[28%] rotate-[-18deg] bg-border" />
              <div className="absolute right-[22%] top-1/2 h-px w-[28%] rotate-18 bg-border" />
              <div className="absolute bottom-[22%] left-1/2 h-[25%] w-px -translate-x-1/2 bg-border" />

              <div className="absolute left-[7%] top-[22%] animate-[float_4s_ease-in-out_infinite]">
                <FilePacket icon={<FileText className="h-5 w-5" />} name="report.pdf" />
              </div>
              <div className="absolute right-[5%] top-[20%] animate-[float_5s_ease-in-out_1s_infinite]">
                <FilePacket icon={<FileImage className="h-5 w-5" />} name="image.png" />
              </div>
              <div className="absolute bottom-[9%] left-[13%] animate-[float_4.5s_ease-in-out_0.5s_infinite]">
                <FilePacket icon={<File className="h-5 w-5" />} name="source.zip" />
              </div>

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border bg-background shadow-2xl">
                  <div className="absolute inset-2 rounded-2xl border border-primary/20" />
                  <img src={LOGO_URL} alt="Packet Picnic" className="relative h-8 w-auto object-contain" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
                  </span>
                </div>
                <div className="mt-5 rounded-full border bg-background/90 px-4 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur">
                  Processing your file...
                </div>
              </div>

              <div className="absolute bottom-[8%] right-[4%] animate-[float_5s_ease-in-out_1.5s_infinite]">
                <div className="rounded-xl border bg-background/90 p-3 shadow-xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border">
                      <Link2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Share link ready</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        appurl.app/f/7xK92
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-[44%] top-[7%] flex h-10 w-10 animate-[float_3.5s_ease-in-out_0.7s_infinite] items-center justify-center rounded-xl border bg-background shadow-lg">
                <Share2 className="h-4 w-4" />
              </div>
              <div className="absolute bottom-[2%] right-[45%] flex h-10 w-10 animate-[float_4s_ease-in-out_1s_infinite] items-center justify-center rounded-xl border bg-background shadow-lg">
                <Lock className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Why Packet Picnic</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Built around your files.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Everything you need to get a file from your device to someone
              else, without unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-3">
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title="Secure"
              description="Your files move through a controlled upload and storage workflow."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Fast"
              description="Upload your file and get a shareable link without unnecessary steps."
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="Simple sharing"
              description="Generate a unique link and share your file wherever you need it."
            />
          </div>
        </div>
      </section>

      {/* How It Works — animated processing → done stepper */}
      <section id="how-it-works" className="border-y bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Upload. Share. Done.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
              File sharing doesn't need a complicated workflow.
            </p>
          </div>

          <ProcessStepper />
        </div>
      </section>

      {/* Simple Product Statement */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="text-sm font-medium text-primary">One simple idea</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                Your file.
                <br />
                <span className="text-muted-foreground">One link.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg leading-7 text-muted-foreground lg:mx-0">
                Packet Picnic keeps the entire experience focused on what
                matters: getting your file uploaded and giving you a link to
                share.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:items-start">
                <CheckItem text="Simple upload workflow" />
                <CheckItem text="Unique shareable links" />
                <CheckItem text="Cloud-based storage" />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="rounded-2xl border bg-muted/20 p-3 sm:p-5">
                <div className="rounded-xl border bg-background p-4 shadow-sm sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-12 sm:w-12">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">project-report.pdf</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        82 MB · Ready to share
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border bg-muted/20 p-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 items-center gap-2">
                        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                          appurl.app/f/7xK92Lm
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full shrink-0 sm:w-auto">
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Link active
                    </span>
                    <span>Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="relative overflow-hidden rounded-3xl border bg-muted/20 px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

            <p className="relative text-sm font-medium text-primary">Packet Picnic</p>
            <h2 className="relative mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-6xl">
              Stop moving files around.
              <br />
              <span className="text-muted-foreground">Start sharing them.</span>
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">
              Upload your first file and experience a simpler way to share.
            </p>

            <Link to="/login" className="relative mt-9 inline-block">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Packet Picnic" className="h-8 w-auto object-contain" />
            <span>© {new Date().getFullYear()} Packet Picnic</span>
          </div>

          <div className="flex gap-5">
            <a href="#home" className="transition-colors hover:text-foreground">Home</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </main>
  );
};

/* ---------------- Process Stepper ---------------- */
/* Cycles through: Upload -> Get link -> Share.
   Each step animates: pending -> processing (spinner) -> done (check) -> next step. */

type ProcessStep = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    icon: <Upload className="h-5 w-5" />,
    title: "Upload",
    description: "Select the file you want to share.",
  },
  {
    icon: <File className="h-5 w-5" />,
    title: "Process",
    description: "Packet Picnic securely processes and stores it.",
  },
  {
    icon: <Link2 className="h-5 w-5" />,
    title: "Share",
    description: "Copy your unique link and send it anywhere.",
  },
];

const PROCESSING_MS = 1400;
const HOLD_DONE_MS = 700;

const ProcessStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState<"processing" | "done">("processing");

  useEffect(() => {
    const toDone = setTimeout(() => setPhase("done"), PROCESSING_MS);
    const toNext = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
      setPhase("processing");
    }, PROCESSING_MS + HOLD_DONE_MS);

    return () => {
      clearTimeout(toDone);
      clearTimeout(toNext);
    };
  }, [activeStep]);

  const getStatus = (index: number): "done" | "active" | "pending" => {
    if (index < activeStep) return "done";
    if (index === activeStep) return "active";
    return "pending";
  };

  return (
    <div className="mt-16 sm:mt-20">
      {/*
        Fixed grid: [step] [connector] [step] [connector] [step].
        The three step columns are always equal width (1fr each) and the
        connectors have a fixed width, so spacing stays even no matter how
        long each step's description text is.
      */}
      <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto_1fr_auto_1fr] items-start">
        {processSteps.map((step, index) => {
          const status = getStatus(index);
          const isLast = index === processSteps.length - 1;

          return (
            <Fragment key={step.title}>
              <div className="flex flex-col items-center px-1 text-center">
                {/* Icon circle */}
                <div
                  className={[
                    "relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-300 sm:h-14 sm:w-14",
                    status === "pending" &&
                      "border-border bg-background text-muted-foreground",
                    status === "active" && phase === "processing" &&
                      "border-primary bg-background text-primary",
                    status === "active" && phase === "done" &&
                      "border-primary bg-primary text-primary-foreground",
                    status === "done" &&
                      "border-primary bg-primary text-primary-foreground",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {status === "active" && phase === "processing" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : status === "done" || (status === "active" && phase === "done") ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                <p
                  className={[
                    "mt-3 text-xs font-medium transition-colors duration-300 sm:text-sm",
                    status === "pending" ? "text-muted-foreground" : "text-foreground",
                  ].join(" ")}
                >
                  {step.title}
                </p>

                <p className="mt-1 hidden max-w-36 text-xs leading-5 text-muted-foreground sm:block">
                  {step.description}
                </p>
              </div>

              {/* Connector line — rendered as its own fixed-width grid column */}
              {!isLast && (
                <div className="relative mt-6 h-0.5 w-6 overflow-hidden rounded-full bg-border sm:mt-7 sm:w-16">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
                    style={{
                      width:
                        status === "done" || (status === "active" && phase === "done")
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Description text for mobile, shown for the active step only */}
      <p className="mx-auto mt-6 max-w-xs text-center text-sm leading-6 text-muted-foreground sm:hidden">
        {processSteps[activeStep].description}
      </p>
    </div>
  );
};

/* ---------------- File Packet ---------------- */

type FilePacketProps = {
  icon: React.ReactNode;
  name: string;
};

const FilePacket = ({ icon, name }: FilePacketProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-background/90 p-3 shadow-lg backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/30">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium">{name}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="text-[10px] text-muted-foreground">Uploading</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Feature Card ---------------- */

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-muted/20 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted/30 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mt-6 font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
};

/* ---------------- Check Item ---------------- */

const CheckItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
        <Check className="h-3.5 w-3.5" />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default HomePage;