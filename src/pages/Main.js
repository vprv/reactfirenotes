import React, {useContext} from 'react';

import Login from "./Login";
import ProfilePage from "./ProfilePage";
import {UserContext} from "../providers/UserProvider";

function Main() {
  const user = useContext(UserContext);
  return (
    user ?
      <ProfilePage />
      :
      <Login />
  );
}

export default Main;
