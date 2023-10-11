import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Swal from "sweetalert2";
const Container = styled.div`
  display: flex;
  border-radius: 16px;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background-color: gray;
  @media (max-width: 500px) {
    justify-content: flex-start;
    align-items: center;
  }
`;
const UploadPanel = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles, "los archivos aceptados", "application/pdf", "image/png");
      // Handle dropped files here
      const fileTypes = acceptedFiles[0].type === "application/pdf" || acceptedFiles[0].type === "image/png";
      if (acceptedFiles.length > 0 && fileTypes) {
        onFileUpload(acceptedFiles);
      } else Swal.fire("Error", "File type not supported. Please upload .pdf or .png files", "error");
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: ".pdf,.png" });

  return (
    <Container {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
      <input accept=".pdf,.png" {...getInputProps()} />
      <p style={{ padding: "15px" }}>Drag & Drop files here or click to select</p>
    </Container>
  );
};

export default UploadPanel;
