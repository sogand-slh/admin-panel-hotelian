import Header from "./components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterSwitch } from "./routes/RouterSwitch";
import { Layout, Menu } from "antd";
import { useEffect } from "react";
import {
  DashboardOutlined,
  ScheduleOutlined,
  UserOutlined,
  DollarCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/",
    },
    {
      key: "2",
      icon: <FormOutlined />,
      label: "Posts",
      path: "/post",
    },
    {
      key: "3",
      icon: <ScheduleOutlined />,
      label: "Tickets",
      path: "/",
    },
    {
      key: "4",
      icon: <DollarCircleOutlined />,
      label: "Payment",
      path: "/",
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "Account Info",
      path: "/",
    },
  ];
  const handleChangePath = (value) => {
    const path = routes?.filter((item) => item.key === value.key)?.[0]?.path;
    navigate(`${path}`);
  };
  let activeMenu;

  useEffect(() => {
    activeMenu = routes?.filter((item) => item.path === location?.pathname)?.[0]
      ?.key;
  }, [location]);

  return (
    <div className="App">
      <Layout>
        <Layout>
          <Header />
        </Layout>
        <Layout style={{ width: "100%", display: "flex" }}>
          <Sider theme="dark">
            <Menu
              mode="inline"
              theme="dark"
              activeKey={activeMenu}
              onClick={(value) => handleChangePath(value)}
              items={routes}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}>
              <main className="flex flex-col justify-between">
                <RouterSwitch />
              </main>
            </Content>
          </Layout>
        </Layout>

        <Footer style={{ textAlign: "center" }}>
          <a href="https://www.hotelian.com/" target="_blank" rel="noreferrer">
            Hotelian
          </a>{" "}
          ©2022 Creator{" "}
          <a href="http://sogand-saleh.ir/" target="_blank" rel="noreferrer">
            Sogand Saleh
          </a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
