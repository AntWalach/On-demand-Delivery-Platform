import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import customAdmin from "../../assets/css/Admin.module.css";
import QuickPackLogo from "../../assets/images/QuickPackLogoAdmin.png";

const AdminLoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className={`${customAdmin.customContainer}  p-4`}>
      <div className="row mx-auto">
        <div className="col-md-12 text-center">
          <h1 className={`${customAdmin.customTextColorHeader} display-6`}>
            Admin
          </h1>
        </div>
      </div>
      <div className="text-center mb-2">
        <img
          src={QuickPackLogo}
          className="App-logo"
          alt="logo"
          width="200"
          height="120"
        />
      </div>
      <Form onSubmit={handleLogin} className="mt-4 w-50 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid">
          <Button className={`${customAdmin.customButton}`} type="submit">
            Login
          </Button>
        </div>
      </Form>
      <div className="text-center mt-3">
        <Link to="/admin/home">Go to Admin Home</Link>
      </div>
    </div>
  );
};

export default AdminLoginForm;
