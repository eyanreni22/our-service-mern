import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 🌈 Styled Components
const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right,rgb(156, 175, 120),rgb(44, 56, 28));
  padding: 1rem;
`;

const RegisterForm = styled.form`
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
  transition: 0.3s ease;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
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
  background: linear-gradient(to right,rgb(51, 51, 57), #3b82f6);
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.payload) {
        navigate("/login");
      }
    });
  };

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Create Account</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
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
        <Select name="role" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="provider">Service Provider</option>
        </Select>
        <SubmitButton type="submit">
          {loading ? "Registering..." : "Register"}
        </SubmitButton>
      </RegisterForm>
    </RegisterWrapper>
  );
};

export default Register;
