import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Lottie from "react-lottie";
import animationData from "../../lotties/travel-login.json";
//Styles
import "./Login.css";

async function loginUser(credentials) {
  return fetch("http://front-api-test.wsafar.com/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const { username, password } = form.getFieldValue();
    const response = await loginUser({
      username,
      password,
    });
    if (response.ok === true) {
      const time = moment(new Date().getTime()).format("MMMM Do YYYY, h:mm a");
      message.success("your sign in operation is successful.").then((value) => {
        localStorage.setItem("accessToken", response.result.access_token);
        localStorage.setItem("time", time);
        navigate("/post");
      });
    } else {
      localStorage.removeItem("accessToken", response.result.access_token);
      message.error("your request is denied!");
    }
  };

  return (
    <div
      className="loginPage"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}>
      <div className="loginForm">
        <h2>Explore World</h2>
        <Form
          name="normal_login"
          form={form}
          onFinish={handleSubmit}
          layout="horizontal">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="BtnLogin">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <h4>Or</h4>
      </div>
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default Login;
