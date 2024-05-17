import React, { useEffect } from "react";
import "antd/dist/antd.min.js";

import { UnorderedListOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Layout, Menu, Spin, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import { useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};
const items = [
  getItem("Danh mục", "sub1", <UnorderedListOutlined />, [
    getItem(<Link to={ROUTE_PATH.CATEGORY_MANAGEMENT}>Danh sách</Link>, "sub11"),
    getItem(<Link to={ROUTE_PATH.ADD_CATEGORY}>Thêm mới</Link>, "sub12"),
  ]),
  getItem("Sản phẩm", "sub2", <UnorderedListOutlined />, [
    getItem(<Link to={ROUTE_PATH.PRODUCT_MANAGEMENT}>Danh sách</Link>, "sub21"),
    getItem(<Link to={ROUTE_PATH.ADD_PRODUCT}>Thêm mới</Link>, "sub22"),
  ]),
  getItem(<Link to={ROUTE_PATH.ORDER_MANAGEMENT}>Đơn hàng</Link>, "1", <ShoppingCartOutlined />),
];

const App = () => {
  const navigate = useNavigate();
  const { isLogged, userInfo, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && (!isLogged || userInfo.role !== "ADMIN")) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [isLoading]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Link to="/">
          <p className="text-white px-6 pt-6 pb-4">Vinh Kiệt Auto</p>
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            padding: "24px 16px",
            overflow: "initial",
          }}
        >
          <div
            style={{
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Bản quyền thuộc về Vinh Kiệt Auto
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
