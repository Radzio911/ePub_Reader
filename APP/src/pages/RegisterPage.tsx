import { useNavigate } from "react-router-dom";
import RegisterForm from "../forms/RegisterForm";
import Template from "../template/Template";
import useApi from "../api";
import { useCookies } from "react-cookie";

export default function RegisterPage() {
  const navigate = useNavigate();
  const api = useApi();
  const [cookies, setCookie] = useCookies(["token"]);
  return (
    <Template>
      <RegisterForm
        onRegister={(username: string, password: string) => {
          api
            .post("/login", JSON.stringify({ username, password }))
            .then((data) => {
              if (data.data.loginin) {
                setCookie("token", data.data.token);
                navigate("/");
              }
            });
        }}
      />
    </Template>
  );
}
