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
  const TestComponet = React.lazy(() => import('~/pages/SetupOwner/StepperThree/StepperThree'));
  const BookingPage = React.lazy(() =>
    import("~/pages/BookingPage/BookingPage")
  );
  const IntroSettingOwnerPage = React.lazy(() => import('../pages/IntroSettingOwnerPage/IntroSettingOwnerPage'));
  const StepperMain = React.lazy(() => import('~/pages/SetupOwner/StepperMain/StepperMain'));

  const [dataStep3, setDataStep3] = React.useState([]);
  const handleSetDataStep3 = (value) => {
    setDataStep3(value);
};
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
        path="/booking"
        element={
          <React.Suspense>
            <BookingPage />
          </React.Suspense>
        }
      />
      <Route
        path="/test1"
        element={
          <React.Suspense>
            <TestComponet setDataStep3={handleSetDataStep3} />
          </React.Suspense>
        }
      />
      <Route
        path="/intro-host"
        element={
          <React.Suspense>
            <IntroSettingOwnerPage />
          </React.Suspense>
        }
      />
      <Route
        path="/stepsetupowner"
        element={
          <React.Suspense>
            <StepperMain />
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
