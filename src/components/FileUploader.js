import React, { useEffect, useState } from "react";
import styles from "../pages/Upload.module.css";
import uploadIcon from "../assets/cloud-upload.svg";
import fileIcon from "../assets/file.svg";
import trashCan from "../assets/trash-can.svg";

const FileUploader = ({
    uploadingFiles,
    setUploadingFiles,
    removeUploadFiles,
}) => {
    const [files, setFiles] = useState([]);

    const handleUploadDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
        handleUpload(droppedFiles);
    }

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
        handleUpload(selectedFiles);
    };

    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        removeUploadFiles(index);
    };

    const handleUpload = async (selectedFiles) => {
        try {
          setUploadingFiles([...uploadingFiles, ...selectedFiles]);
        } catch (error) {
          console.log(error);
        }
    };
    
    return (
        <div className={styles.fileUploader}>
          <div
            className={styles.dropZone}
            onDrop={handleUploadDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* Always render drop zone icon & text */}
            <img
              src={uploadIcon}
              alt="Upload icon"
              className={styles.dropZoneIcon}
            />
            <div className={styles.dropZoneText}>Drag and Drop here</div>
            <div className={styles.dropZoneSubtext}>or</div>
            <label className={styles.selectFileButton}>
              Select file
              <input
                type="file"
                onChange={handleFileSelect}
                className={styles.visuallyHidden}
                multiple
                accept="pdf"
              />
            </label>
    
            {files.length > 0 && (
              <div className={styles.fileListContainer}>
                <div className={styles.fileList}>
                  {files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                      <img
                        src={fileIcon}
                        alt="File icon"
                        className={styles.fileIcon}
                      />
                      <div className={styles.fileDetails}>
                        <div className={styles.fileName}>{file.name}</div>
                      </div>
                      <img
                        src={trashCan}
                        alt="Delete icon"
                        className={styles.deleteIcon}
                        onClick={() => removeFile(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

export default FileUploader;