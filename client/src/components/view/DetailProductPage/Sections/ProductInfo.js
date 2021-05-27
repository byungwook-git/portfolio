import React from "react";
import { Row, Col, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_action";

function ProductInfo(props) {
  const dispatch = useDispatch();
  const clickHnadler = () => {
    //필요한 정보를 Cart 필드에 넣어준다
    dispatch(addToCart(props.detail._id));
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{props.detail.title}</h2>
      </div>
      <div className="detail_box">
        <h3>컬러 :</h3>
        <h2>{props.detail.color}</h2>
      </div>
      <hr />
      <div className="detail_box">
        <h2>구매가 :</h2>
        <h2>{props.detail.price}원</h2>
      </div>
      <Row>
        <Col lg={12} xs={24}>
          <Button size="large" style={{ width: "100%" }} onClick={clickHnadler}>
            <ShoppingCartOutlined style={{ fontSize: "25px" }} />
          </Button>
        </Col>
        <Col lg={12} xs={24}>
          <Button href="/" size="large" style={{ width: "100%" }}>
            뒤로가기
          </Button>
        </Col>
      </Row>
      <div className="detail_box">
        <h2>{props.detail.description}</h2>
      </div>
      <div className="detail_box">
        <div style={{ flex: "none" }}>
          <h2>사이즈 :</h2>
        </div>
        <div>
          <h2>{props.detail.size}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
