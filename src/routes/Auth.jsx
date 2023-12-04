import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter } from 'react-router-dom';
import ListAccomPage from '~/pages/public/ListAccomPage/ListAccomPage';
import LayoutAdmin from '~/pages/admin/LayoutAdmin/LayoutAdmin';
import PrivateRoute from '~/components/PrivateRoute/PrivateRoute';
import LoadingPage from '~/pages/public/LoadingPage/LoadingPage';
const Auth = () => {
    // Public Page
    const HomePage = React.lazy(() => import('../pages/public/HomePage/HomePage'));
    const InfoUserPage = React.lazy(() => import('../pages/public/InfoUserPage/InfoUserPage'));
    const RoomDetail = React.lazy(() => import('../pages/public/RoomDetail/RoomDetail'));
    const Register = React.lazy(() => import('../components/Register/Register'));
    const NotFoundPage = React.lazy(() => import('../pages/public/NotFoundPage/NotFoundPage'));
    const CongratulationPage = React.lazy(() => import('../pages/partner/CongratulationPage/Congratulation'));
    const TestComponet = React.lazy(() => import('~/components/Test/Test'));
    const BookingPage = React.lazy(() => import('~/pages/client/BookingPage/BookingPage'));
    const IntroSettingOwnerPage = React.lazy(() =>
        import('../pages/partner/IntroSettingOwnerPage/IntroSettingOwnerPage')
    );
    const ContactForm = React.lazy(() => import('../pages/public/Contact/Contact'));
    // Host Owner Page
    const StepperMain = React.lazy(() => import('~/pages/partner/SetupOwner/StepperMain/StepperMain'));
    const OwnerSetting = React.lazy(() => import('~/pages/partner/OwnerSetting/MainOwnerSetting/OwnerSetting'));
    const ListRoomOfHost = React.lazy(() => import('../pages/partner/OwnerSetting/ManagerRoom/ListRoomOfHost'));

    // Client Page
    const HistoryBookingPage = React.lazy(() => import('../pages/client/HistoryBookingPage/HistoryBookingPage'));
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense>
                        <HomePage />
                    </Suspense>
                }
            />
            <Route
                path="/account/*"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <InfoUserPage />
                            </Suspense>
                        }
                    />
                }
            />

            {/* <Route path="/account/*" element={<PrivateRoute element={<InfoUserPage />} />} /> */}
            <Route
                path="/room-detail/:id"
                element={
                    <Suspense>
                        <RoomDetail />
                    </Suspense>
                }
            />
            <Route
                path="/contact"
                element={
                    <Suspense>
                        <ContactForm />
                    </Suspense>
                }
            />

            <Route
                path="/congratulation"
                element={
                    <Suspense>
                        <CongratulationPage />
                    </Suspense>
                }
            />
            <Route
                path="/booking"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <BookingPage />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/myBooking"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <HistoryBookingPage />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/test1"
                element={
                    <Suspense>
                        <TestComponet />
                    </Suspense>
                }
            />
            <Route
                path="/intro-host"
                element={
                    <Suspense>
                        <IntroSettingOwnerPage />
                    </Suspense>
                }
            />
            <Route
                path="/stepsetupowner"
                element={
                    <Suspense>
                        <StepperMain />
                    </Suspense>
                }
            />
            <Route
                path="/host"
                element={
                    <Suspense>
                        <OwnerSetting />
                    </Suspense>
                }
            />
            <Route
                path="/host/setting"
                element={
                    <Suspense>
                        <ListRoomOfHost />
                    </Suspense>
                }
            />
            <Route
                path="*"
                element={
                    <Suspense>
                        <NotFoundPage />
                    </Suspense>
                }
            />
            <Route
                path="/list-accom"
                element={
                    <Suspense>
                        <ListAccomPage />
                    </Suspense>
                }
            />
            <Route path="/admin/*" element={<LayoutAdmin />} />
        </Routes>
    );
};
export default Auth;
