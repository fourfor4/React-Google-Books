import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Space, Image, Popconfirm, message } from "antd";
import { StarOutlined, StarFilled, EyeFilled } from "@ant-design/icons";
import { IBook } from "../interfaces";
import { BooksContext } from "../contexts/BooksContext";
import constants from "../constants";

type Props = {
  book: IBook;
  fav?: boolean;
};

const { imgPlaceholderURL, text } = constants;
const {
  addDescription,
  addSuccessMsg,
  addText,
  removeDescription,
  removeSuccessMsg,
  removeText,
} = text;

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
            okText={<span data-testid="add-confirm-btn">Yes</span>}
            cancelText="No"
          >
            <StarOutlined
              style={{ cursor: "pointer", color: "#1677ff", fontSize: 24 }}
              data-testid="add-to-list"
            />
          </Popconfirm>
        ) : (
          <Popconfirm
            placement="topLeft"
            title={removeText}
            description={removeDescription}
            onConfirm={handleRemoveFromReadingList}
            okText={<span data-testid="remove-confirm-btn">Yes</span>}
            cancelText="No"
          >
            <StarFilled
              style={{ cursor: "pointer", color: "#1677ff", fontSize: 24 }}
              data-testid="remove-from-list"
            />
          </Popconfirm>
        )
      }
    >
      <Typography.Title
        level={5}
        style={{
          marginTop: 0,
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Author: {book.volumeInfo.authors?.join(", ") || "-"}
        <React.Fragment>
          {book.saleInfo?.buyLink && (
            <Link to={book.saleInfo.buyLink} target="_blank">
              <EyeFilled />
            </Link>
          )}
        </React.Fragment>
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
