import React from "react";
import { Space, Divider, Typography, Badge } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: 16 }} id="navbar">
      <Space split={<Divider type="vertical" />}>
        <Typography style={{ color: "white" }}>Google Books</Typography>
        <Link to={"/"}>Search</Link>
        <Link to={"/readinglist"}>Reading List</Link>
      </Space>
    </div>
  );
};

export default Navbar;
