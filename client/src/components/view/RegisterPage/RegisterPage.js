import React, { useRef } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
const { Title } = Typography;

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  //유효성 검사
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.email);

    let body = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        history.push("/login");
      } else {
        alert("회원가입 실패");
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
        회원가입
      </Title>
      <Form.Item required label="이메일">
        <Input
          placeholder="###@###.###"
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type === "required" && (
          <p>이메일을 입력해주세요.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>이메일이 틀렸습니다.</p>
        )}
      </Form.Item>
      <Form.Item required label="이름">
        <Input
          placeholder="이름"
          name="name"
          type="text"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <p>이름을 입력해주세요.</p>
        )}
        {errors.name && errors.name.type === "maxLength" && <p>너무 길어요.</p>}
      </Form.Item>

      <Form.Item required label="비밀번호">
        <Input
          placeholder="비밀번호"
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>비밀번호를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>너무 짧아요.</p>
        )}
      </Form.Item>
      <Form.Item required label="비밀번호 확인">
        <Input
          placeholder="비밀번호 확인"
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>비밀번호를 입력해주세요</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>비밀번호가 일치하지않습니다.</p>
          )}
      </Form.Item>
      <hr />
      <Button style={{ width: "100%" }} type="primary" htmlType="submit">
        완료
      </Button>
      <p />
      <Button
        style={{ width: "100%" }}
        href="/login"
        type="primary"
        htmlType="button"
      >
        취소
      </Button>
    </form>
  );
}

export default RegisterPage;
