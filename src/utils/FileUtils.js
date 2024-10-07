import axios from "axios";
import API_BASE_URL from '../config/apiConfig';

const uploadGMLFileToServer = async (formData, token, farmId) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/FileUpload/uploadGMLFile/${farmId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status < 200 || response.status >= 300) {
        console.error('Failed to upload file, response status:', response.status);
        throw new Error('Failed to upload file');
      }

      alert('File uploaded successfully!');
    } catch (error) {
      console.error("Error uploading GML file:", error);
      throw new Error("Failed to upload GML file. Please try again later.");
    }
};


export { uploadGMLFileToServer };
