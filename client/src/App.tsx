import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SharedFilesPage from "./pages/dashboard/SharedFilesPage";
import TrashPage from "./pages/dashboard/TrashPage";

import { useAuth } from "./hooks/useAuth";

function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/files/:uniqueId" element={<SharedFilesPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="trash" element={<TrashPage />} />
        </Route>

        <Route
          path="/upload"
          element={<Navigate to="/dashboard/upload" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;