import { render } from "@testing-library/react";
import AppHeader from "../components/app-header/app-header";
import Main from "../components/main/main";

export function Constructor () {
  return (
    <>
      <AppHeader/>
      <Main/>
    </>
  )
}