import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 🌈 Styled Components
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, rgb(32, 32, 39), rgb(165, 179, 185));
  padding: 1rem;
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #4f46e5;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #6366f1, #3b82f6);
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #4f46e5, #2563eb);
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Removed `user` since it's not needed here
  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));

    if (res.payload) {
      const role = res.payload.user?.role;
      if (role === "provider") {
        navigate("/provider/dashboard");
      } else if (role === "customer") {
        navigate("/customer/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit">
          {loading ? "Logging in..." : "Login"}
        </SubmitButton>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
