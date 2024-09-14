import axios from "axios";

const uploadGMLFileToServer = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        alert('File uploaded successfully!');
      } catch (error) {
        console.error("Error uploading GML file:", error);
        throw new Error("Failed to upload GML file. Please try again later.");
      }
};

export { uploadGMLFileToServer };