import React, { useState, useRef } from 'react';
import styles from './Upload.module.css';

function Upload() {
  const [files, setFiles] = useState([]);
  const dropRef = useRef(null);

  // Helper to update our files state
  const handleFiles = (fileList) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(fileList)]);
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add(styles.dragover);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove(styles.dragover);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove(styles.dragover);
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  // When selecting files via the "Browse" button
  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className={styles.container}>
      <h1>File Uploader</h1>
      
      {/* Dropzone + "Browse" button */}
      <div
        className={styles.dropzone}
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag & drop files here</p>
        <p>or</p>

        <label className={styles.uploadLabel}>
          Browse
          <input
            type="file"
            multiple
            className={styles.fileInput}
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      {/* Display the list of uploaded files */}
      {files.length > 0 && (
        <div className={styles.fileList}>
          <h3>Uploaded Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Upload;
