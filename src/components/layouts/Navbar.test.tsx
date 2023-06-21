import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { BooksContext, BooksProvider } from "../../contexts/BooksContext";
import Navbar from "./Navbar";
import { mockBooks } from "../../mock/mock.data";

describe("Navbar component", () => {
  it("should render the Google Books title", () => {
    render(
      <Router basename="/">
        <BooksProvider>
          <Navbar />
        </BooksProvider>
      </Router>
    );
    expect(screen.getByText("Google Books")).toBeInTheDocument();
  });

  it("should render the Search and Reading List links", () => {
    render(
      <Router basename="/">
        <BooksProvider>
          <Navbar />
        </BooksProvider>
      </Router>
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Reading List")).toBeInTheDocument();
  });

  it("should render the reading list badge with count when the reading list is not empty", () => {
    const mockBookValue = {
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchResult: [],
      setSearchResult: jest.fn(),
      readingList: mockBooks,
      setReadingList: jest.fn(),
    };
    render(
      <Router basename="/">
        <BooksContext.Provider value={mockBookValue}>
          <Navbar />
        </BooksContext.Provider>
      </Router>
    );
    expect(screen.getByText("Reading List")).toHaveTextContent(
      mockBooks.length + ""
    );
  });

  it("should not render the reading list badge when the reading list is empty", () => {
    const mockBookValue = {
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchResult: [],
      setSearchResult: jest.fn(),
      readingList: [],
      setReadingList: jest.fn(),
    };
    render(
      <Router basename="/">
        <BooksContext.Provider value={mockBookValue}>
          <Navbar />
        </BooksContext.Provider>
      </Router>
    );
    expect(screen.getByText("Reading List")).not.toHaveTextContent("0");
  });
  it("should redirect to search book page (default page)", async () => {
    render(
      <Router basename="/">
        <BooksProvider>
          <Navbar />
        </BooksProvider>
      </Router>
    );
    const linkToSearch = screen.getByText("Search");
    await act(() => {
      fireEvent.click(linkToSearch);
    });
    expect(location.pathname).toEqual("/");
  });
  it("should redirect to reading list page", async () => {
    render(
      <Router basename="/">
        <BooksProvider>
          <Navbar />
        </BooksProvider>
      </Router>
    );
    const linkToSearch = screen.getByText("Reading List");
    await act(() => {
      fireEvent.click(linkToSearch);
    });
    expect(location.pathname).toEqual("/readinglist");
  });
});
