// Library
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Customer Page
const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'))
const InfoUserPage = React.lazy(()=> import('../pages/InfoUserPage/InfoUserPage'))
const VerificationCode = React.lazy(()=> import('../components/VerificationCode/VerificationCode'))
const RoomDetail =   React.lazy(()=> import('../pages/RoomDetail/RoomDetail'))
const Register = React.lazy(() => import('../components/Register/Register') )
const Auth = () => {
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
        path="/VerificationCode"
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
            <Register email="userC@gmail.com"/>
          </React.Suspense>
        }
      />
      <Route
        path="/RoomDetail/:id"
        element={
          <React.Suspense>
            <RoomDetail />
          </React.Suspense>
        }
      />
    </Routes>
  )
}
export default Auth
