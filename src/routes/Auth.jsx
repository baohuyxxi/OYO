import React from "react";
import { Routes, Route } from "react-router-dom";
import { unstable_HistoryRouter } from "react-router-dom";
import ListAccomPage from "~/pages/ListAccomPage/ListAccomPage";

const Auth = () => {
  // Customer Page
  const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
  const InfoUserPage = React.lazy(() =>
    import("../pages/InfoUserPage/InfoUserPage")
  );
  const RoomDetail = React.lazy(() => import("../pages/RoomDetail/RoomDetail"));
  const Register = React.lazy(() => import("../components/Register/Register"));
  const NotFoundPage = React.lazy(() =>
    import("../pages/NotFoundPage/NotFoundPage")
  );
  const CongratulationPage = React.lazy(() =>
    import("../pages/CongratulationPage/Congratulation")
  );
  const TestComponet = React.lazy(() => import("~/components/Test/Test"));
  const Test = React.lazy(() =>
    import("~/components/CommentReview/CommentReview")
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
        path="/CongratulationPage"
        element={
          <React.Suspense>
            <CongratulationPage />
          </React.Suspense>
        }
      />

      <Route
        path="/test"
        element={
          <React.Suspense>
            <Test />
          </React.Suspense>
        }
      />
      <Route
        path="/test1"
        element={
          <React.Suspense>
            <TestComponet />
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
