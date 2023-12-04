import React, { useState } from "react";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đăng ký đến server hoặc thực hiện xử lý dữ liệu tại đây
    console.log(formData);
    // Reset form sau khi submit thành công
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
