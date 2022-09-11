import { Redirect, Route } from 'react-router-dom';
import { selectPerson } from '../services/actions/person';
import { useSelector, } from 'react-redux';

export default function ProtectedRoute({ children, ...rest }) {
  const { isLoaded, success } = useSelector(selectPerson);
  console.log(success)
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