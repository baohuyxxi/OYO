import React from "react";
import { Routes, Route } from "react-router-dom";
import { unstable_HistoryRouter } from "react-router-dom";
import ListAccomPage from "~/pages/public/ListAccomPage/ListAccomPage";
import LayoutAdmin from "~/pages/admin/LayoutAdmin/LayoutAdmin";

const Auth = () => {
  // Customer Page
  const HomePage = React.lazy(() => import("../pages/public/HomePage/HomePage"));
  const InfoUserPage = React.lazy(() =>
    import("../pages/public/InfoUserPage/InfoUserPage")
  );
  const RoomDetail = React.lazy(() => import("../pages/public/RoomDetail/RoomDetail"));
  const Register = React.lazy(() => import("../components/Register/Register"));
  const NotFoundPage = React.lazy(() =>
    import("../pages/public/NotFoundPage/NotFoundPage")
  );
  const CongratulationPage = React.lazy(() =>
    import("../pages/partner/CongratulationPage/Congratulation")
  );
  const TestComponet = React.lazy(() =>
    import("~/components/Test/Test")
  );
  const BookingPage = React.lazy(() =>
    import("~/pages/client/BookingPage/BookingPage")
  );
  const IntroSettingOwnerPage = React.lazy(() =>
    import("../pages/partner/IntroSettingOwnerPage/IntroSettingOwnerPage")
  );
  const StepperMain = React.lazy(() =>
    import("~/pages/partner/SetupOwner/StepperMain/StepperMain")
  );
  // Host Owner Page
  const OwnerSetting = React.lazy(() => import('~/pages/partner/OwnerSetting/MainOwnerSetting/OwnerSetting'));
  const ListRoomOfHost = React.lazy(() => import('../pages/partner/OwnerSetting/ManagerRoom/ListRoomOfHost'));
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
        path="/congratulation"
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
            <TestComponet />
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
        path="/host"
        element={
          <React.Suspense>
            <OwnerSetting />
          </React.Suspense>
        }
      />
        <Route
                path="/host/setting"
                element={
                    <React.Suspense>
                        <ListRoomOfHost />
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

      <Route path="/admin/*" element={<LayoutAdmin />} />
    </Routes>
  );
};
export default Auth;
