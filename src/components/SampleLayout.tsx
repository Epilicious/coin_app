import React from "react";
import { ReactElement } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import "./SampleLayout.css";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

function SampleLayout(props: { children: ReactElement }): ReactElement {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {new Array(2).fill(null).map((_, index) => {
            const key = index + 1;
            const menuItems = ["Home", "Coins"];
            const menuLinks = ["/", "/coins"];
            return (
              <Menu.Item key={key}>
                <Link to={menuLinks[index]}> {menuItems[index]}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2021 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default SampleLayout;
