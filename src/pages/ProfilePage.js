import React, { useContext } from "react";
import { UserContext } from '../providers/UserProvider';
import {auth} from "../firebase";
const ProfilePage = () => {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  return (
    <div>
      <div>
        <div
          style={{
            background:
              `url(${photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgT9kbszqM7fbnqU1Mh_klw_4tGznX9KrExN9A_EaOrIVnYBv0&usqp=CAU'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div>
          <h2>{displayName}</h2>
          <h3>{email}</h3>
        </div>
      </div>
      <a className="waves-effect waves-light btn" onClick={() => {auth.signOut()}}>Sign out</a>
    </div>
  )
};
export default ProfilePage;
