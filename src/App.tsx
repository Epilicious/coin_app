import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import SampleLayout from "./components/SampleLayout";
import Routes from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <SampleLayout>
        <Routes />
      </SampleLayout>
    </BrowserRouter>
  );
}

export default App;
