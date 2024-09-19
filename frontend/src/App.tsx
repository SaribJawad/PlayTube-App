import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import PublicRoute from "./ui/PublicRoute";
import SearchResultPage from "./pages/SearchResultPage";
import VideoDetailPage from "./pages/VideoDetailPage";
import ChannelPage from "./pages/ChannelPage";
import LikedVideosPage from "./pages/LikedVideosPage";
import ChannelSubscribersPage from "./pages/ChannelSubscribersPage";
import WatchedHistoryPage from "./pages/WatchedHistoryPage";
import MyContentPage from "./pages/MyContentPage";
import PlaylistDetailsPage from "./pages/PlaylistDetailsPage";
import PlaylistPage from "./pages/PlaylistPage";

const App: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={<ProtectedRoute component={MainLayout} path="/" />}
    >
      <Route index element={<HomePage />} />
      <Route path="/searchResult/:query" element={<SearchResultPage />} />
      <Route path="/videoView/:videoId" element={<VideoDetailPage />} />
      <Route path="/profile/:userId/:username" element={<ChannelPage />} />

      <Route path="/likedVideos" element={<LikedVideosPage />} />
      <Route path="/watchedHistory" element={<WatchedHistoryPage />} />
      <Route
        path="/channelSubscribers/:channelId"
        element={<ChannelSubscribersPage />}
      />
      <Route path="/myContent" element={<MyContentPage />} />
      <Route path="/playlist/:userId" element={<PlaylistPage />} />
      <Route
        path="/playlistDetails/:playlistId"
        element={<PlaylistDetailsPage />}
      />
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
