import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SWAIFDashboard from "./SWAIFDashboard.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SWAIFDashboard />
    </StrictMode>
);
