import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Upload from './pages/Upload';
import UploadHistory from './pages/UploadHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Upload />}/>
      <Route path="/BulkUpload" element={<Upload />} />
      <Route path="/Upload-History" element={<UploadHistory />}/>
    </Routes>
  );
}

export default App;
