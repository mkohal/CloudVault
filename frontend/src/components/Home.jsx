import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [deletingFile, setDeletingFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("");
      setSelectedFile(null);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("dropzone-file-upload", selectedFile);

    setIsUploading(true); // Set uploading state

    try {
      const { data } = await axios.post("/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

     console.log("Upload Successful", data);
     toast.success(data.message);
      setUploadedFiles((prev) => [...prev, data.file]);
      setSelectedFile(null);
      setFileName("");
    } catch (error) {
     toast.error(error.response?.data?.message || "Something went wrong!");
    }

    setIsUploading(false); // Reset after upload completes
  };

useEffect(() => {
  const fetchFiles = async () => {
    if (!localStorage.getItem("token")) return; // Prevent API call if user is not logged in

    try {
      const response = await axios.get("/api/files", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error fetching files!");
    }
  };

  fetchFiles();
}, []);

  const handleDownload = async (public_id) => {
    try {
      const response = await axios.get(`/api/download/${public_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Added Authorization
        },
      });
      if (response.status === 200 && response.data.signedUrl) {
        window.open(response.data.signedUrl, "_blank");
      } else {
        toast.error("Failed to open file!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to open file!");
    }
  };

  const handleDelete = async (public_id) => {
    setDeletingFile(public_id);

    try {
      const response = await axios.delete(`/api/delete/${public_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Added Authorization
        },
      });

      if (response.data.success) {
        // Remove the deleted file from the UI
        setUploadedFiles((prevFiles) =>
          prevFiles.filter((file) => file.public_id !== public_id)
        );
        toast.success(response.data.message);
        console.log(response.data.message);
      } else {
        toast.error("Failed to delete file!");
      }
    } catch (error) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
    setDeletingFile(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      {isAuthenticated ? (
        <div className="max-w-5xl mx-auto">
          {/* Upload Section */}
          <div className="bg-gray-300 dark:bg-gray-800 shadow-xl rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
              Upload Your Documents
            </h2>

            <form onSubmit={handleUpload} className="space-y-4">
              <div className="relative w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG, PDF (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="dropzone-file-upload"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>

              {fileName && (
                <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                  Selected File: {fileName}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                disabled={isUploading}
              >
                {isUploading ? "Uploading File..." : "Upload File"}
              </button>
            </form>
          </div>

          {/* Uploaded Files Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Uploaded Files
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles?.length > 0 ? (
                uploadedFiles.map((file) => (
                  <div
                    key={file.public_id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md"
                  >
                    <span className="text-gray-900 dark:text-white text-sm truncate w-4/5">
                      {deletingFile === file.public_id
                        ? "Deleting..."
                        : file.originalname}
                    </span>
                    <button
                      className="text-gray-800 dark:text-white hover:text-blue-600 transition mr-3"
                      onClick={() => handleDownload(file.public_id)}
                      disabled={deletingFile === file.public_id}
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-800 transition"
                      onClick={() => handleDelete(file.public_id)}
                      disabled={deletingFile === file.public_id}
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m5 0h-5m-6 0H3m3 0v12a2 2 0 002 2h8a2 2 0 002-2V6M10 11v6m4-6v6"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No files uploaded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome to Cloud Vault
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Securely store and access your files anytime, anywhere. Login to get
            started!
          </p>
          <NavLink to="/login">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Home;
