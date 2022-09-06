import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserAuth, selectPerson } from '../services/actions/person';
import { useSelector, useDispatch } from 'react-redux';
import { authUser } from '../utils/constants'

export default function ProtectedRoute({ children, ...rest }) {
  const { isLoaded, success } = useSelector(selectPerson);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth(authUser));
  }, []);

  if (!isLoaded) {
    
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        success ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}