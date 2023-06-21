import React, { useContext } from "react";
import { Typography, Empty, Layout } from "antd";
import { BooksContext } from "../contexts/BooksContext";
import BookItem from "../components/Book.item";

const { Content } = Layout;

const ReadingList = () => {
  const { readingList } = useContext(BooksContext);

  return (
    <Content data-testid="reading-list">
      <Typography.Title level={3} style={{ fontWeight: "bold" }}>
        Reading List
      </Typography.Title>
      {readingList.map((book, index) => (
        <BookItem book={book} key={`book-${index}`} fav={true} />
      ))}
      {readingList.length === 0 && <Empty />}
    </Content>
  );
};

export default ReadingList;
