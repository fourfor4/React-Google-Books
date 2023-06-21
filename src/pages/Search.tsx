import React, { useContext, useEffect, useState } from "react";
import { Typography, Form, Input, Button, Spin, Empty, Layout } from "antd";
import axios from "axios";
import { IBook } from "../interfaces";
import { BooksContext } from "../contexts/BooksContext";
import BookItem from "../components/Book.item";

const { Content } = Layout;
const maxResult = 5;

const Search: React.FC = () => {
  const {
    readingList,
    searchQuery,
    setSearchQuery,
    searchResult,
    setSearchResult,
  } = useContext(BooksContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    searchForm.setFieldsValue({ query: searchQuery });
  }, [searchQuery]);

  const getFavStatus = (book: IBook) => {
    if (readingList.filter((item) => item.id === book.id).length > 0)
      return true;
    else return false;
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (values: any) => {
    setLoading(true);
    const { query } = values;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResult}`
      );
      setSearchResult(response.data.items || []);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Content data-testid="search-books">
      <Typography.Title level={3} style={{ fontWeight: "bold" }}>
        Google Books Search
      </Typography.Title>
      <Form form={searchForm} onFinish={handleSearch} autoComplete="off">
        <Form.Item
          label="Query"
          name="query"
          rules={[
            { required: true, message: "Please input query!" },
            { pattern: /\S/, message: "Please input any text!" },
          ]}
        >
          <Input onChange={handleSearchQuery} data-testid="search-input" />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            data-testid="search-submit-btn"
          >
            Search
          </Button>
        </Form.Item>
      </Form>
      <Content data-testid="search-result-content">
        <Spin spinning={loading} tip="Loading...">
          {searchResult.map((book, index) => (
            <BookItem
              book={book}
              key={`book-${index}`}
              fav={getFavStatus(book)}
            />
          ))}
          {searchResult.length === 0 && <Empty data-testid="empty-state" />}
        </Spin>
      </Content>
    </Content>
  );
};

export default Search;
