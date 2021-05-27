import React from "react";
import { Menu } from "antd";
const { SubMenu } = Menu;
function LeftMenu(props) {
  const handleClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu mode={props.mode} onClick={handleClick()}>
      <SubMenu key="sub1" title="Navigation One">
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
