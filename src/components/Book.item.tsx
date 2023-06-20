import React from "react";
import { Card, Typography, Space, Image } from "antd";
import { IBook } from "../interfaces";

type Props = {
  book: IBook;
};
const imgPlaceholderURL = "https://via.placeholder.com/150";

const BookItem: React.FC<Props> = ({ book }) => {
  const getSmallThumbnail = (book: IBook) => {
    let smallThumbnailURL =
      book.volumeInfo &&
      book.volumeInfo.imageLinks &&
      book.volumeInfo.imageLinks.smallThumbnail;
    return smallThumbnailURL ? smallThumbnailURL : imgPlaceholderURL;
  };

  return (
    <Card
      key={book.id}
      title={
        <Typography.Title level={3} style={{ fontWeight: "bold" }}>
          {book.volumeInfo.title}
        </Typography.Title>
      }
      style={{ marginBottom: 8 }}
    >
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        Author: {book.volumeInfo.authors?.join(", ") || "-"}
      </Typography.Title>
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        Publisher: {book.volumeInfo.publisher || "-"}
      </Typography.Title>
      <Space align="start" size={24}>
        <Image
          src={getSmallThumbnail(book)}
          alt={getSmallThumbnail(book) ? book.volumeInfo.title : "no-image"}
          width={100}
        />
        <Typography>{book.volumeInfo.description}</Typography>
      </Space>
    </Card>
  );
};

export default BookItem;
