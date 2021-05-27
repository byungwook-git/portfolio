import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";

function ProductImage(props) {
  const [Images, setImages] = useState([]);
  console.log(props.detail);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.map((item) => {
        images.push(`http://localhost:5000/${item}`);
      });
      setImages(images);
    }
  }, [props.detail]);
  // props.detail.map((products, index) => {
  //   console.log(products.images);
  // });
  const renderImages = Images.map((products, index) => {
    return (
      <div key={index}>
        <img width="100%" src={products} />
      </div>
    );
  });
  const renderSubImages = Images.map((product, index) => {
    return (
      <Image
        key={index}
        src={product}
        style={{
          width: "150px",
          height: "150px",
        }}
      />
    );
  });
  return (
    <>
      <Carousel style={{ width: "100%" }} autoplay>
        {renderImages}
      </Carousel>

      <div
        style={{
          display: "flex",
          marginTop: "10px",
          overflow: "auto",
        }}
      >
        {renderSubImages}
      </div>
    </>
  );
}

export default ProductImage;
