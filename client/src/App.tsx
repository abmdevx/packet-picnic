import { testBackend } from "@/api/health";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { useState } from "react";

export default function BackendTest() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tested, setTested] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTest = async () => {
    try {
      setLoading(true);
      setTested(false);

      const result = await testBackend();

      setMessage(result.message);
      setSuccess(true);
      setTested(true);
    } catch {
      setMessage("Backend is not reachable.");
      setSuccess(false);
      setTested(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Packet Picnic</h1>

        <Button onClick={handleTest} disabled={loading}>
          {loading ? "Testing..." : "Test Backend"}
        </Button>

        {tested ? (
          <Alert
            className={`w-fit mx-auto text-left ${
              success
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
          >
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click the button to check the server.
          </p>
        )}
      </div>
    </main>
  );
}