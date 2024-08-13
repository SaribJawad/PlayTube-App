import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </Route>
  </Routes>
);

export default App;
