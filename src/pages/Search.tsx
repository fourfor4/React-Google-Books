import React, { useContext, useEffect, useState } from "react";
import { Typography, Form, Input, Button, Spin, Empty, Layout } from "antd";
import axios from "axios";
import { IBook } from "../interfaces";
import { BooksContext } from "../contexts/BooksContext";
import BookItem from "../components/Book.item";
import config from "../config";

const { Content } = Layout;
const { maxResult } = config;

const Search: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResult, setSearchResult } =
    useContext(BooksContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [searchForm] = Form.useForm();

  useEffect(() => {
    searchForm.setFieldsValue({ query: searchQuery });
  }, [searchQuery]);

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
      console.log(response);
      setSearchResult(response.data.items || []);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Content>
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
          <Input onChange={handleSearchQuery} />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Search
          </Button>
        </Form.Item>
      </Form>
      <Content>
        <Spin spinning={loading} tip="Loading...">
          {searchResult.map((book, index) => (
            <BookItem book={book} key={`book-${index}`} />
          ))}
          {searchResult.length === 0 && <Empty />}
        </Spin>
      </Content>
    </Content>
  );
};

export default Search;
