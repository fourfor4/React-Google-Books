import React, { useContext } from "react";
import { Space, Divider, Typography, Badge } from "antd";
import { Link } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksContext";

const Navbar: React.FC = () => {
  const { readingList } = useContext(BooksContext);
  return (
    <div style={{ textAlign: "center", padding: 16 }} id="navbar">
      <Space split={<Divider type="vertical" />}>
        <Typography style={{ color: "white" }}>Google Books</Typography>
        <Link to="/">Search</Link>
        <Link
          to={"/readinglist"}
          style={{ display: "flex", alignItems: "center" }}
        >
          Reading List
          {readingList.length > 0 && (
            <Badge
              count={readingList.length}
              size="small"
              color="green"
              style={{ marginBottom: 12, marginLeft: 4 }}
            />
          )}
        </Link>
      </Space>
    </div>
  );
};

export default Navbar;
