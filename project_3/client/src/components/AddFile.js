import React, { useState } from 'react';
import axios from 'axios';
import './AddFile.css';

const AddFile = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (allowedTypes.includes(selectedFile.type) || 
          selectedFile.name.endsWith('.csv') || 
          selectedFile.name.endsWith('.xlsx') || 
          selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a CSV or Excel file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('File uploaded successfully! Processing data...');
      setTimeout(() => {
        setMessage('Data processed successfully! You can now view analytics in the Dashboard.');
      }, 2000);
      
      setFile(null);
      document.getElementById('file-input').value = '';
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-file-container">
      <div className="add-file-card">
        <h2>Upload Data File</h2>
        <p className="subtitle">Upload a CSV or Excel file to start analyzing your data</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="upload-area">
          <input
            type="file"
            id="file-input"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            <div className="upload-icon">📁</div>
            <div>
              {file ? (
                <span className="file-name">{file.name}</span>
              ) : (
                <>
                  <span className="upload-text">Click to select file</span>
                  <span className="upload-hint">CSV or Excel files only</span>
                </>
              )}
            </div>
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p><strong>File:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="btn btn-primary btn-full"
        >
          {uploading ? 'Uploading...' : 'Upload & Process'}
        </button>

        <div className="info-box">
          <h3>Supported Formats:</h3>
          <ul>
            <li>CSV files (.csv)</li>
            <li>Excel files (.xlsx, .xls)</li>
          </ul>
          <p className="info-text">
            Your data will be automatically cleaned and processed for analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddFile;

