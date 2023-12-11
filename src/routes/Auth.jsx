import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter } from 'react-router-dom';
import ListAccomPage from '~/pages/public/ListAccomPage/ListAccomPage';
import LayoutAdmin from '~/pages/admin/LayoutAdmin/LayoutAdmin';
import PrivateRoute from '~/components/PrivateRoute/PrivateRoute';
import LoadingPage from '~/pages/public/LoadingPage/LoadingPage';
import ActiveAccountPage from '~/pages/public/ActiveAccountPage/ActiveAccountPage';
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
    const FavoritesPage = React.lazy(() => import('../pages/client/FavoritesPage/FavoritesPage'));
    // Host Owner Page
    const StepperMain = React.lazy(() => import('~/pages/partner/SetupOwner/StepperMain/StepperMain'));
    const OwnerSetting = React.lazy(() => import('~/pages/partner/OwnerSetting/MainOwnerSetting/OwnerSetting'));
    const ListRoomOfHost = React.lazy(() => import('../pages/partner/OwnerSetting/ManagerRoom/ListRoomOfHost'));
    const TransactionHistoryOwner = React.lazy(() =>
        import('../pages/partner/OwnerSetting/TransactionHistoryOwner/TransactionHistoryOwner')
    );
    const CalendarRoomSetting = React.lazy(() =>
        import('../pages/partner/OwnerSetting/CalendarRoomSetting/CalendarRoomSetting')
    );
    const ManagerRoom = React.lazy(() => import('../pages/partner/OwnerSetting/ManagerRoom/ManagerRoom'));
    const ConvenientOwnerSetting = React.lazy(() =>
        import('../pages/partner/OwnerSetting/ConvenientOwnerSetting/ConvenientOwnerSetting')
    );
    const CountRoomDetailSetting = React.lazy(() =>
        import('../pages/partner/OwnerSetting/CountRoomDetailSetting/CountRoomDetailSetting')
    );
    // Client Page
    const HistoryBookingPage = React.lazy(() => import('../pages/client/HistoryBookingPage/HistoryBookingPage'));
    return (
        <Routes>
            <Route
                path="/active-account"
                element={
                    <Suspense>
                        <ActiveAccountPage />
                    </Suspense>
                }
            />

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
                path="/wishlists"
                element={
                    <Suspense>
                        <FavoritesPage />
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
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <StepperMain />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/host"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <OwnerSetting />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/host/setting"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <ListRoomOfHost />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/host/setting/:idHome"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <ManagerRoom />
                            </Suspense>
                        }
                    />
                }
            />

            <Route
                path="/host/setting/convenient/:idHome"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <ConvenientOwnerSetting />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/host/setting/transactionhistory"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <TransactionHistoryOwner />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/host/setting/calendar"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <CalendarRoomSetting />
                            </Suspense>
                        }
                    />
                }
            />
            <Route
                path="/host/setting/countroomdetail/:idHome"
                element={
                    <PrivateRoute
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <CountRoomDetailSetting />
                            </Suspense>
                        }
                    />
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
