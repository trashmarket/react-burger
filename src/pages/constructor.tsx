import Main from "../components/main/main";
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useState, useEffect, PropsWithChildren, FC } from 'react';
import { TMain } from '../components/main/main';

type TConstructor = TMain;

 const Constructor: FC<TConstructor> = (props) => {
  return (<Main {...props} />);
}

export {Constructor}