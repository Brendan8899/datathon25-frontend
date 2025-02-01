import React, { useState } from 'react';
import styles from './Upload.module.css';
import FileUploader from '../components/FileUploader';
import Sidebar from '../components/SideBar';
import { uploadFiles } from "../api/api";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const removeUploadFiles = (index) => {
    const updatedFiles = uploadingFiles.filter((_, i) => i !== index);
    setUploadingFiles(updatedFiles);
  };

  const handleUploadFiles = async () => {
    try {
      const selectedFiles = uploadingFiles;
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
      const response = await uploadFiles(formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Validate
      if (!uploadingFiles || uploadingFiles.length === 0) {
        alert("Please upload files before start grading!");
        return;
      }

      await handleUploadFiles();
    } catch (error) {
      alert("Cannot grade your essay at this time, please try again later!");
      console.log(error);
    } finally {
      navigate("/Upload-History");
    }
  };

  return (
    <div className={styles.parentContainer} >
      <Sidebar/>
      <div className={styles.container}>
        <FileUploader
          setUploadingFiles={setUploadingFiles}
          uploadingFiles={uploadingFiles}
          removeUploadFiles={removeUploadFiles}
        />
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>Upload Files</button>
    </div>
  );
}

export default Upload;
