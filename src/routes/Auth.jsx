// Library
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Customer Page
const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'))
const InfoUserPage = React.lazy(()=> import('../pages/InfoUserPage/InfoUserPage'))
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
    </Routes>
  )
}
export default Auth
