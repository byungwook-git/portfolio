import React, { useState } from "react";
// import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import { AlignRightOutlined } from "@ant-design/icons";

function NavBarPage() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      className="container"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            width: "150px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a href="/" style={{ fontSize: "20px", textDecoration: "none" }}>
            portfolio
          </a>
        </div>
        {/* <div className="left_menu">
          <LeftMenu mode="horizontal" />
        </div> */}
      </div>
      <div className="right_menu">
        <RightMenu mode="horizontal" />
      </div>
      <Button className="header_drawer" onClick={showDrawer}>
        <AlignRightOutlined />
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {/* <LeftMenu mode="inline" /> */}
        <RightMenu mode="inline" />
      </Drawer>
    </div>
  );
}

export default NavBarPage;
