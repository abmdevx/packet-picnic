import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUploader from "./components/FileUploader";
import SharedFile from "./pages/SharedFile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUploader />} />
        <Route path="/files/:uniqueId" element={<SharedFile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;