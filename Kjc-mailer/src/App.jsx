import React from "react";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./Nav";
import "./App.css";
import { Header } from "./Header";
import { Background } from "./Background";
import { About } from "./Routes/About";
import { TemplateUpload } from "./Routes/TemplateUpload";
import { SuccessReports } from "./Routes/SuccessReports";
import { ErrorReport } from "./Routes/ErrorReport";

export default function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Background />} />
      <Route path="/templateupload" element={<TemplateUpload />} />
      <Route path ="/SuccessReports" element={<SuccessReports/>}/>
      <Route path ="/ErrorReport" element={<ErrorReport/>}/>
    </Routes>
  );
}

function Home() {
  return (
    <>
      <Nav />
      <Header />
      <Background />
    </>
  );
}
