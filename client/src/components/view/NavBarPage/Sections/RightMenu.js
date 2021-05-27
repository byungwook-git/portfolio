import React from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  console.log(user.userData);

  let history = useHistory();
  const logOutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response.data);
      if (response.data.success) {
        history.push("/login");
      } else {
        alert("로그아웃 하는 데 실패 했습니다.");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item>
          <a href="/login">로그인</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload"> 업로드</a>
        </Menu.Item>
        <Menu.Item key="link" href="#link">
          <Badge
            count={user.userData && user.userData.cart.length}
            size="small"
          >
            <a href="/user/cart">
              <ShoppingCartOutlined style={{ fontSize: "20px" }} />
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="history">
          <a href="/history "> 구매내역</a>
        </Menu.Item>

        <Menu.Item key="logout" onClick={logOutHandler}>
          로그아웃
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
