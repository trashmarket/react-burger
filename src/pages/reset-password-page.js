import { useEffect } from "react";

import ResetPassworldMain from '../components/reset-password-main/reset-password-main';
import { useSelector } from 'react-redux';

const selectPassword = state => state.password;

function ResetPassworldPage() {
  const password = useSelector(selectPassword);

  useEffect(()=>{
    console.log(password);
  }, [password])

  return (<ResetPassworldMain />);  
}

export { ResetPassworldPage }