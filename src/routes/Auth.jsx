import React from "react";
import { Routes, Route } from "react-router-dom";
import ListAccomPage from "~/pages/ListAccomPage/ListAccomPage";

const Auth = () => {
  // Customer Page
  const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
  const InfoUserPage = React.lazy(() =>
    import("../pages/InfoUserPage/InfoUserPage")
  );
  const VerificationCode = React.lazy(() =>
    import("../components/VerificationCode/VerificationCode")
  );
  const RoomDetail = React.lazy(() => import("../pages/RoomDetail/RoomDetail"));
  const Register = React.lazy(() => import("../components/Register/Register"));
  const NotFoundPage = React.lazy(() =>
    import("../pages/NotFoundPage/NotFoundPage")
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense>
            <HomePage />
          </React.Suspense>
        }
      />
      <Route
        path="/account/*"
        element={
          <React.Suspense>
            <InfoUserPage />
          </React.Suspense>
        }
      />
      <Route
        path="/verification-code"
        element={
          <React.Suspense>
            <VerificationCode />
          </React.Suspense>
        }
      />
      <Route
        path="/Register"
        element={
          <React.Suspense>
            <Register email="userD@gmail.com" />
          </React.Suspense>
        }
      />
      <Route
        path="/room-detail/:id"
        element={
          <React.Suspense>
            <RoomDetail />
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <React.Suspense>
            <NotFoundPage />
          </React.Suspense>
        }
      />

      <Route
        path="/list-accom"
        element={
          <React.Suspense>
            <ListAccomPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
export default Auth;
