import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


const ProtectedRoutes = ({component:Component, ...rest}) => {
 const {user,  isAuthenticated, loading } = useSelector((state) => state.user);
  return (
      <div>
          {loading === false && (
              <Route {...rest} render={props => {
                  if (isAuthenticated === false) {
                    return <Redirect to="/login" />;
                  }
                //   if (isAdmin === true && user.role !== 'admin') {
                //     return <Redirect to="/" />;
                //   }
                  return <Component {...props}/>
              }}
              />
          )}
    </div>
  )
}

export default ProtectedRoutes