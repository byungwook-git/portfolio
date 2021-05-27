import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { auth } from "../_actions/user_action";

const fn = function (SpecificComponent, option, adminRoute = null) {
  //null => 아무나 출입 가능
  //true => 로그인한 유저만 출입 가능
  //false => 로그인한 유저는 출입 불가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    let user = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        if (!response.payload.isAuth) {
          if (option) {
            history.push("/login");
          }
        } else {
          //-
          if (adminRoute && !response.payload.isAdmin) {
            history.push("/");
          } else {
            if (option === false) history.push("/");
          }
        }
      });
    }, [dispatch, history]);
    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
};
export default fn;
