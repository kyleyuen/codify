import React from "react";
import AppRoutes from "./Handles/routes.jsx";

export default function App() {
  // App acts as a thin handler that delegates to the routes/outlet.
  return <AppRoutes />;
}

export { App };
    
