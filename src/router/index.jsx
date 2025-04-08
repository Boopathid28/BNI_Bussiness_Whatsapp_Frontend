import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../auth/Login'
import Layout from '../layout'
import Groups from '../pages/groups'
import { AuthenticationRoutes } from './routing_menu_list'

export default function Router() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem('is_authenticated'));

    setIsAuthenticated(isAuth)
  },[])

  return (
    <Routes>
        <Route path='/' element={isAuthenticated ? <Layout /> : <Login />}>
          {
            AuthenticationRoutes.map((item, index) => (
              <Route path={item.path} element={item.component} />
            ))
          }
        </Route>
    </Routes>
  )
}
