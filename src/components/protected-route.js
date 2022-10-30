import { Redirect, Route } from 'react-router-dom';
import { selectPerson, getUserAuth } from '../services/actions/person';
import { baseUrl } from '../utils/constants';
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ children, ...rest }) {
  const { isLoaded, success } = useSelector(selectPerson);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserAuth(baseUrl + 'auth/user'));
  }, [])

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