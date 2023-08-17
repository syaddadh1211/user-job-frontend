import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import UserSector from "./pages/UserSector";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      {/* <UserPage /> */}
      <Routes>
        <Route path="/" element={<UserPage />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="edit" element={<UserSector />} />
        {/* <Route path="register" element={<RegisterPage />} />
        <Route path="category/:jenis" element={<CategoriesResult />} />
        <Route
          path="selected/:bookSlug"
          element={
            <ProtectedComponent>
              <DetailBook />
            </ProtectedComponent>
          }
        />
        <Route path="search/:keyword" element={<SearchResult />} />

        <Route
          path="wishlist"
          element={
            <ProtectedComponent>
              <MyWishlist />{" "}
            </ProtectedComponent>
          }
        />

        <Route path="*" element={<h1>Halaman tidak ditemukan</h1>} /> */}
      </Routes> 
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
