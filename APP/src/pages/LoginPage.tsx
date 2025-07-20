import React from "react";
import api from "../api";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Template from "../template/Template";

export default function LoginPage() {
  return (
    <Template>
      <LoginForm />
    </Template>
  );
}
