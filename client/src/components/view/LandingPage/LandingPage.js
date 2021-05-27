import React, { useEffect, useState } from "react";

import { modelnames, price } from "./Sections/Datas";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";

import axios from "axios";
import { Card, Row, Col, Button } from "antd";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    modelnames: [],
    price: [],
  });

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);

    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  const getProducts = (body) => {
    axios
      .post("/api/product/products", body)

      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          if (body.loadMore) {
            setProducts([...Products, ...response.data.productInfo]);
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("상품을 가져오는데 실패 했습니다.");
        }
      });
  };
  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
    };

    getProducts(body);
    setSkip(skip);
  };
  const renderCards = Products.map((products, index) => {
    return (
      <Col lg={6} md={12} xs={24} key={index}>
        <Card
          hoverable
          cover={
            <a href={`/product/${products._id}`}>
              <img
                style={{ width: "100%", maxHeight: "100%" }}
                alt="example"
                src={`http://localhost:5000/${products.images[0]}`}
              />
            </a>
          }
        >
          <Meta title={products.title} description={`${products.price}원`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    console.log("filters", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "30px" }}>
        {/* Filter */}
        <Row>
          <Col lg={12} xs={24}>
            {/* Check */}
            <CheckBox
              list={modelnames}
              handleFilters={(filters) => handleFilters(filters, "modelnames")}
            />
          </Col>
          <Col lg={12} xs={24}>
            {/* Radio */}
            <RadioBox
              list={price}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </Col>
        </Row>
        {/* CheckBox */}

        {/* Card */}
        <Row>{renderCards}</Row>
        {PostSize >= Limit && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <Button onClick={loadMoreHandler}>더보기</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
