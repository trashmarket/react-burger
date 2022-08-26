import { useEffect } from "react";
import AppHeader from "../components/app-header/app-header";
import ForgotPasswordMain from '../components/forgot-password-main/forgot-password-main';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const selectPassword = state => state.password;

function ForgotPasswordPage() {
  const password = useSelector(selectPassword);
  const history = useHistory();

  useEffect(() => {
     if (password.passwordMessage.success){
      history.replace({ pathname: "/reset-password" })
     }

  }, [password]);

  return (
    <>
      <AppHeader/>
      <ForgotPasswordMain/>
    </>
  )
}

export { ForgotPasswordPage };