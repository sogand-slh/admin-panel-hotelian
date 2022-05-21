import { Button, message, Modal, PageHeader, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

// Style
import "./Header.css";

const { confirm } = Modal;

const token = window.localStorage.getItem("accessToken");
async function logoutUser(credentials) {
  return fetch(
    `https://front-api-test.wsafar.com/users/logout?access-token=${token}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
}

const Header = () => {
  const navigate = useNavigate();
  //get data from local storage

  const username = window.localStorage.getItem("username");
  const password = window.localStorage.getItem("password");
  const loginTime = window.localStorage.getItem("time");

  const handleLogout = async () => {
    const response = await logoutUser({
      username,
      password,
    });
    if (response.ok === true) {
      confirm({
        title: "Are you sure to logout?",
        onOk() {
          window.localStorage.removeItem("accessToken");
          navigate("/login");
        },
      });
    }
  };
  return (
    <div className="header">
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Hi Dear User,"
          subTitle="You can book every Hotel around the world"
          backIcon={<i class="fa-solid fa-plane-departure"></i>}
          breadcrumbRender={() => {}}
        />
      </div>
      <div className="rightSide_header">
        {token ? (
          <Button type="text" onClick={() => handleLogout()}>
            <i
              class="fa-solid fa-right-from-bracket"
              style={{ paddingRight: "5px" }}></i>
            {"Logout"}
          </Button>
        ) : (
          <Button type="text" onClick={() => navigate("/login")}>
            <i
              class="fa-solid fa-circle-user"
              style={{ paddingRight: "5px" }}></i>
            {"Login"}
          </Button>
        )}
        <Button type="text">
          <i class="fa-solid fa-gear"></i>
        </Button>
        <Tooltip title={loginTime}>
          <Button type="text">
            <i class="fa-solid fa-clock"></i>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
