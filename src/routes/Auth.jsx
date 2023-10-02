// Library
import React from 'react'
import { Routes, Route } from 'react-router-dom'


// Customer Page
const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'))

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
    </Routes>
  )
}
export default Auth
