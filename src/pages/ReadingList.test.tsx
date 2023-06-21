import { render, screen } from "@testing-library/react";
import { BooksContext, BooksProvider } from "../contexts/BooksContext";
import ReadingList from "./ReadingList";
import { mockBooks } from "../mock/mock.data";
import { IBook } from "../interfaces";

describe("ReadingList component", () => {
  it("should render the reading list correctly", () => {
    render(
      <BooksProvider>
        <ReadingList />
      </BooksProvider>
    );
    expect(screen.getByTestId("reading-list")).toBeInTheDocument();
  });

  it("should render the list of books", () => {
    const mockBookValue = {
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchResult: [] as IBook[],
      setSearchResult: jest.fn(),
      readingList: mockBooks,
      setReadingList: jest.fn(),
    };
    render(
      <BooksContext.Provider value={mockBookValue}>
        <ReadingList />
      </BooksContext.Provider>
    );
    mockBooks.forEach((book: IBook) => {
      expect(screen.getByText(book.volumeInfo.title)).toBeInTheDocument();
    });
  });

  it("should render an empty state when the reading list is empty", () => {
    const mockBookValue = {
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchResult: [],
      setSearchResult: jest.fn(),
      readingList: [],
      setReadingList: jest.fn(),
    };
    render(
      <BooksContext.Provider value={mockBookValue}>
        <ReadingList />
      </BooksContext.Provider>
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
