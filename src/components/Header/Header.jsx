import { Button, Modal, PageHeader, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

// Style
import "./Header.css";

const { confirm } = Modal;

const Header = () => {
  const navigate = useNavigate();
  //get data from local storage
  const token = window.localStorage.getItem("accessToken");
  const loginTime = window.localStorage.getItem("time");

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    confirm({
      title: "Are you sure to logout?",
      onOk() {
        navigate("/login");
      },
    });
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
