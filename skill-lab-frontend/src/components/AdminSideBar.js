import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./AdminSidebar.css";
import React from "react";
import admin from "../image/admin.png";

import { Table, Button, Input } from "antd";
import { EditOutlined, DeleteOutlined, AudioOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminSidebar() {
  return (
    <>
      <Layout className="Admin-Layout">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <h3 className="adminHeader">SKILL LAB</h3>
          <img src={admin} className="adminavatar" alt="Looking for job?" />

          <h6 className="AdminTopic">Admin</h6>

          <Menu
            theme="dark"
            mode="inline"
            id="adminbar"
            defaultSelectedKeys={["4"]}
          >
            <div className="admin-bar-content">
              <Menu.Item key="1" icon={<UserOutlined />}>
                Job Vacancy Management
              </Menu.Item>
              <div className="listItems">
                <Menu.Item key="2">Add a new vacancy</Menu.Item>
                <Menu.Item key="3">Update a vacancy</Menu.Item>
                <Menu.Item key="4">Delete a vacancy</Menu.Item>
              </div>

              <Menu.Item key="5" icon={<VideoCameraOutlined />}>
                Applicant Details Management
              </Menu.Item>
              <div className="listItems">
                <Menu.Item key="6">Delete applicant request</Menu.Item>
              </div>
            </div>
          </Menu>
        </Sider>
      </Layout>
    </>
  );
}
