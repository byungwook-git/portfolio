import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import { useHistory } from "react-router-dom";
const { TextArea } = Input;

const Modelnames = [
  { key: 1, value: "LASSIE" },
  { key: 2, value: "ROY" },
  { key: 3, value: "MOSS" },
  { key: 4, value: "MIAMI VICE" },
];

function UploadPage(props) {
  let history = useHistory();

  const [Title, setTitle] = useState("");
  const [Color, setColor] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Size, setSize] = useState("");
  const [Images, setImages] = useState([]);
  const [Modelname, setModelname] = useState(1);

  const TitleChange = (event) => {
    setTitle(event.currentTarget.value);
  };
  const colorChange = (event) => {
    setColor(event.currentTarget.value);
  };
  const descriptionChange = (event) => {
    setDescription(event.currentTarget.value);
  };
  const priceChange = (event) => {
    setPrice(event.currentTarget.value);
  };
  const sizeChange = (event) => {
    setSize(event.currentTarget.value);
  };
  const ImageChange = (event) => {
    setImages(event.currentTarget.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const modelnameChange = (event) => {
    setModelname(event.currentTarget.value);
  };
  const submitHandler = (event) => {
    event.preventDefault(); // 새로고침 방지

    if (
      !Title ||
      !Color ||
      !Description ||
      !Price ||
      !Size ||
      !Modelname ||
      !Images.length === 0
    ) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }
    // 서버에 채운 값 전송
    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      color: Color,
      description: Description,
      price: Price,
      size: Size,
      images: Images,
      modelnames: Modelname,
    };
    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        history.push("/");
      } else {
        alert("상품 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <h2>업로드</h2>
      </div>
      <br />
      <FileUpload refreshFunction={updateImages} />
      <Form>
        <br />
        <label>모델명</label>
        <select onChange={modelnameChange} value={Modelname}>
          {Modelnames.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <label>제목</label>
        <Input onChange={TitleChange} value={Title} />
        <br />
        <label>컬러</label>
        <Input onChange={colorChange} value={Color} />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChange} value={Description} />
        <br />
        <label>가격</label>
        <Input type="number" onChange={priceChange} value={Price} />
        <br />
        <label>사이즈</label>
        <TextArea onChange={sizeChange} value={Size} />
        <br />
      </Form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" onClick={submitHandler} size="large">
          확인
        </Button>
        <Button href="/" size="large">
          취소
        </Button>
      </div>
    </div>
  );
}

export default UploadPage;
