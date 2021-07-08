import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import SampleLayout from "./components/SampleLayout";
import Routes from "./components/Routes";
import { StoreProvider } from "./Store";

function App() {
  return (
    <>
      <StoreProvider>
        <BrowserRouter>
          <SampleLayout>
            <Routes />
          </SampleLayout>
        </BrowserRouter>
      </StoreProvider>
    </>
  );
}

export default App;
