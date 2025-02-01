const HOST_API = "http://127.0.0.1:5000"

export const uploadFiles = async (formData) => {
    try {
        const response = await fetch (`${HOST_API}/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("File upload failed");
        }

        return true;
    } catch (error) {
        console.error("Error in uploadFiles:", error);
    }
};

export const documentList = async (page) => {
    try {
        const response = await fetch(`${HOST_API}/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pageNum: page
          }),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error) {
        console.error("Error in retrieving document list", error);
      }
};

export const fileUploadPageNumber = async () => {
    try {
        const response = await fetch(`${HOST_API}/page`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        if (!response.ok) {
          throw new Error("Page Number Retrieval failed");
        }
        return await response.json();
      } catch (error) {
        console.error("Error in fileUploadPageNumber:", error);
      }
};

export const visualizeGraphs = async (listOfID) => {
    try {
        const response = await fetch(`${HOST_API}/visualize`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Accept": "text/html"
            },
            body: JSON.stringify({
                document_id: listOfID
            }),
        });
        if (!response.ok) {
            throw new Error("Page Number Retrieval failed");
          }
          return await response.text();
        } catch (error) {
          console.error("Error in fileUploadPageNumber:", error);
        }
  };