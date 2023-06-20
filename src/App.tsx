import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Search from "./pages/Search";
import ReadingList from "./pages/ReadingList";
import { BooksProvider } from "./contexts/BooksContext";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router basename="/">
      <BooksProvider>
        <Layout>
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <Navbar />
          </Header>
          <Content
            style={{
              padding: 24,
              background: "white",
            }}
          >
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/readinglist" element={<ReadingList />} />
            </Routes>
          </Content>
        </Layout>
      </BooksProvider>
    </Router>
  );
};

export default App;
