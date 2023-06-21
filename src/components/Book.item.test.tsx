import { render, screen, fireEvent, act } from "@testing-library/react";
import BookItem from "./Book.item";
import { BooksContext } from "../contexts/BooksContext";
import { mockBooks } from "../mock/mock.data";

const mockBook = mockBooks[0];

describe("BookItem component", () => {
  it("should render correctly", () => {
    render(<BookItem book={mockBook} />);
    expect(screen.getByText(mockBook.volumeInfo.title)).toBeInTheDocument();
    expect(
      screen.getByText(`Author: ${mockBook.volumeInfo.authors.join(", ")}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Publisher: ${mockBook.volumeInfo.publisher}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockBook.volumeInfo.title)).toBeInTheDocument();
  });

  it("should handle adding book to reading list", async () => {
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
        <BookItem book={mockBook} />
      </BooksContext.Provider>
    );
    const addButton = screen.getByTestId("add-to-list");
    await act(async () => {
      fireEvent.click(addButton);
    });
    const confirmButton = screen.getByTestId("add-confirm-btn");
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    expect(localStorage.getItem("readingList")).toEqual(
      JSON.stringify([mockBook])
    );
    expect(mockBookValue.setReadingList).toHaveBeenCalledWith([mockBook]);
  });

  it("should handle removing book from reading list", async () => {
    localStorage.setItem("readingList", JSON.stringify(mockBooks));
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
        <BookItem book={mockBook} fav={true} />
      </BooksContext.Provider>
    );
    const removeButton = screen.getByTestId("remove-from-list");
    await act(async () => {
      fireEvent.click(removeButton);
    });
    const confirmButton = screen.getByTestId("remove-confirm-btn");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
    expect(localStorage.getItem("readingList")).toEqual(
      JSON.stringify(mockBooks.slice(1, mockBooks.length))
    );
    expect(mockBookValue.setReadingList).toHaveBeenCalledWith(
      mockBooks.slice(1, mockBooks.length)
    );
  });
});
