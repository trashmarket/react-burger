import ProfileMain from "../components/profile-main/profile-main"
import {TProfileMain} from '../components/profile-main/profile-main';
import {FC} from 'react';

const ProfilePage:FC<TProfileMain> = (props) => {

  return (<ProfileMain {...props}/>);
}

export {ProfilePage};