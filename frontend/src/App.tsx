import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import PublicRoute from "./ui/PublicRoute";
import SearchResultPage from "./pages/SearchResultPage";

const App: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={<ProtectedRoute component={MainLayout} path="/" />}
    >
      <Route index element={<HomePage />} />
      <Route path="searchResult" element={<SearchResultPage />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
    <Route
      path="/auth"
      element={<PublicRoute component={AuthLayout} path="/auth" />}
    >
      <Route index element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </Route>
  </Routes>
);

export default App;
