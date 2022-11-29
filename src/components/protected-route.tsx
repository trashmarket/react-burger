import { Redirect, Route, RouteProps } from 'react-router-dom';
import { selectPerson, getUserAuth } from '../services/actions/person';
import { baseUrl } from '../utils/constants';
import { useSelector, useDispatch} from '../services/hooks';
import { useState, useEffect, PropsWithChildren, FC } from 'react';

type TProtectedRoute = RouteProps & PropsWithChildren;

 const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
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

export default ProtectedRoute