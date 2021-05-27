import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";

import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="container">
      <Row>
        <Col lg={12} md={12} xs={24} style={{ padding: "40px" }}>
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} md={12} xs={24} style={{ padding: "40px" }}>
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
