import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "../../index.css";
import axios from "axios";
import API_URL from "../../api";
import swalAlert from "../../backend/utils/swal";
import { data } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/check-auth`, {
          withCredentials: true,
        });

        if (response.data.authenticated) {
          setLogin(true);
        }
      } catch (err) {
        setLogin(false);
      }
    };

    checkAuth();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendLogin = async (dataToSend) => {
    try {
      if (dataToSend.password.length < 8) {
        swalAlert("Warning", "Password has to be at least 8 characters");
        return;
      }
      const response = await axios.post(`${API_URL}/login`, dataToSend, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        swalAlert("Success", response.data.message);
        setLogin(true);
        setOpenLoginModal(false);
        setActiveTab("login");
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      swalAlert("Error", err.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      action: activeTab,
    };
    sendLogin(dataToSend);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      });
      setLogin(false);
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    }
  };

  return (
    <div>
      {login ? (
        <span className="nav-link" onClick={handleLogout}>
          <i className="las la-user-slash login-logout-icons"></i>Log out
        </span>
      ) : (
        <span className="nav-link" onClick={() => setOpenLoginModal(true)}>
          <i className="las la-user login-logout-icons"></i>Log in
        </span>
      )}

      <Modal
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        center
        classNames={{
          modal: "custom-modal",
          overlay: "custom-overlay",
        }}
      >
        <div className="modal-header">
          <h5 className="h5">User Login</h5>
        </div>
        <div className="small-line"></div>

        <form onSubmit={handleLogin}>
          <div className="modal-body">
            <div className="form-div">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-div">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="login-register-div">
            <button
              type="button"
              className={`login-register-btn ${
                activeTab === "login" ? "activeTab" : ""
              }`}
              onClick={() => setActiveTab("login")}
            >
              Log in
            </button>
            <button
              type="button"
              className={`login-register-btn ${
                activeTab === "register" ? "activeTab" : ""
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="small-line"></div>

          <div className="modal-footer d-flex gap-1">
            <button
              type="button"
              className="custom-btn-secondary"
              onClick={() => setOpenLoginModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="custom-btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
