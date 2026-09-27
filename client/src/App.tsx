import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUploader from "./components/FileUploader";
import SharedFile from "./pages/SharedFile";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<FileUploader />} />
        <Route path="/files/:uniqueId" element={<SharedFile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;