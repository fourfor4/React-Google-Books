import React, { useContext } from "react";
import {
  Card,
  Typography,
  Space,
  Image,
  Popconfirm,
  message,
  Button,
} from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { IBook } from "../interfaces";
import { BooksContext } from "../contexts/BooksContext";

type Props = {
  book: IBook;
  fav?: boolean;
};
const imgPlaceholderURL = "https://via.placeholder.com/150";

const addText = "Are you sure to add this book to the reading list?";
const addDescription = "Add this to the reading list.";
const addSuccessMsg = "Added the book successfully.";

const removeText = "Are you sure to remove this book from the reading list?";
const removeDescription = "Remove this from the reading list.";
const removeSuccessMsg = "Remove the book successfully.";

const BookItem: React.FC<Props> = ({ book, fav }) => {
  const { setReadingList } = useContext(BooksContext);
  const localReadingList = localStorage.getItem("readingList") || "[]";
  const readingList = JSON.parse(localReadingList);

  const getSmallThumbnail = (book: IBook) => {
    let smallThumbnailURL =
      book.volumeInfo &&
      book.volumeInfo.imageLinks &&
      book.volumeInfo.imageLinks.smallThumbnail;
    return smallThumbnailURL ? smallThumbnailURL : imgPlaceholderURL;
  };

  const handleSaveToReadingList = () => {
    let updateList = [...readingList, book];
    localStorage.setItem("readingList", JSON.stringify(updateList));
    setReadingList(updateList);
    message.success(addSuccessMsg);
  };

  const handleRemoveFromReadingList = () => {
    let updateList = readingList.filter((item: IBook) => item.id !== book.id);
    localStorage.setItem("readingList", JSON.stringify(updateList));
    setReadingList(updateList);
    message.success(removeSuccessMsg);
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
      extra={
        !fav ? (
          <Popconfirm
            placement="topLeft"
            title={addText}
            description={addDescription}
            onConfirm={handleSaveToReadingList}
            okText="Yes"
            cancelText="No"
          >
            <StarOutlined
              style={{ cursor: "pointer", color: "#1677ff", fontSize: 24 }}
            />
          </Popconfirm>
        ) : (
          <Popconfirm
            placement="topLeft"
            title={removeText}
            description={removeDescription}
            onConfirm={handleRemoveFromReadingList}
            okText="Yes"
            cancelText="No"
          >
            <StarFilled
              style={{ cursor: "pointer", color: "#1677ff", fontSize: 24 }}
            />
          </Popconfirm>
        )
      }
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
