import LoginForm from "../forms/LoginForm";
import Template from "../template/Template";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Template>
      <LoginForm
        onLogin={() => {
          navigate("/");
        }}
      />
    </Template>
  );
}
