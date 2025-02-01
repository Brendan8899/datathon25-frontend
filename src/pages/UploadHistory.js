// UploadHistory.js
import React, { useState, useEffect } from 'react';
import styles from './UploadHistory.module.css';
import { documentList, fileUploadPageNumber, visualizeGraphs } from '../api/api';
import Sidebar from '../components/SideBar';

function UploadHistory() {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntries, setSelectedEntries] = useState([]);

  const fetchDocumentList = async (page) => {
    try {
      const result = await documentList(page);
      setUploadHistory(result);
    } catch (error) {
      console.error("Error fetching document list:", error);
    }
  };

  const fetchFileUploadPageNumber = async () => {
    try {
      const totalPageNumber = await fileUploadPageNumber();
      if (totalPageNumber) {
        setTotalPages(totalPageNumber.pages);
      }
    } catch (error) {
      console.error("Error fetching page number:", error);
    }
  };

  const handleCheckboxClick = (recordId, event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
        setSelectedEntries((prevSelected) => [...prevSelected, recordId]);
    } else {
        setSelectedEntries((prevSelected) =>
        prevSelected.filter((id) => id !== recordId)
      );
    }
    console.log(selectedEntries)
  };

  const handleVisualizeClick = async (selectedEntries, e) => {
    e.preventDefault();
    if (selectedEntries.length === 0) {
      alert("Please upload files before starting grading!");
      return;
    } else {
      try {
        // Await the HTML content from visualizeGraphs
        const htmlContent = await visualizeGraphs(selectedEntries);
    
        // Open a new window
        const newWindow = window.open("", "_blank");
    
        // Write the HTML content into the new window
        newWindow.document.open();
        newWindow.document.write(htmlContent);
        newWindow.document.close();
      } catch (error) {
        console.error("Error visualizing graphs:", error);
      }
    }
  };
  useEffect(() => {
    fetchDocumentList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchFileUploadPageNumber();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar/>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Upload Date</th>
            <th>Check to Visualize</th>
          </tr>
        </thead>
        <tbody>
          {uploadHistory.map((record) => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{new Date(record.datetime).toLocaleString()}</td>
              <td>
                <input type="checkbox"
                    onChange={(e) => handleCheckboxClick(record._id, e)}>
                </input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          <div className={styles.buttonGroup}>
              <span className={styles.pagination}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                          key={page}
                          className={currentPage === page ? styles.activePage : ''}
                          onClick={() => setCurrentPage(page)}
                      >
                          {page}
                      </button>
                  ))}
              </span>
              <button className= {styles.visualizeButton}
                    onClick={(e) => handleVisualizeClick(selectedEntries, e)}
                >Visualize Graphs</button>
          </div>
    </div>
  );
}

export default UploadHistory;
