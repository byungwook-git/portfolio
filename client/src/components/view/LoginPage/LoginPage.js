import React, { useRef } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let body = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  // console.log(watch("name"));
  const password = useRef();
  password.current = watch("password");

  return (
    <form
      style={{ width: "350px", margin: "50px auto" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        로그인
      </Title>
      <Form.Item label="이메일" required>
        <Input
          type="email"
          placeholder="###@###.###"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type === "required" && (
          <p>이메일을 입력해주세요.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>이메일이 틀렸습니다.</p>
        )}
      </Form.Item>

      <Form.Item label="비밀번호" required>
        <Input
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>비밀번호를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>너무 짧아요.</p>
        )}
      </Form.Item>
      <hr />
      <Button style={{ width: "100%" }} htmlType="submit" type="primary">
        로그인
      </Button>
      <p />
      <Button
        style={{ width: "100%" }}
        htmlType="button"
        href="/register"
        type="primary"
      >
        회원가입
      </Button>
    </form>
  );
}

export default LoginPage;
