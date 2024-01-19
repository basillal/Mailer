
import React, { useState } from "react";
import { Nav } from "../Nav";
import axios from 'axios';
export const TemplateUpload = () => {


  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };



  const handleCreateTemplate = async () => {
    try {
      const formData = new FormData();
      formData.append('template_name', "my-temp");
      formData.append('html_template', file, file.name); // Append the file with its name
      

      const response = await axios.post('http://127.0.0.1:8000/create_template_test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
    alert(response.data.message)
      
    } catch (error) {
      // console.error('Error creating email template:', error);
      alert(error.response.data.message)

      
      
    }
  };

  return (
    <>
    <Nav></Nav>
    <div className="TemplateUpload">
      <div className="TemplateCard">
        <div className="form-group">
          <label htmlFor="fileInput">Choose File:</label>
          <input
            type="file"
            id="fileInput"
            accept=".html"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button onClick={handleCreateTemplate} className="btn btn-primary">
          Create Template
        </button>
      </div>
    </div>
  </>
  )
}
