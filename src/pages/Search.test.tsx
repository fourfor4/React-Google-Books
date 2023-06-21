import { render, screen, fireEvent, act } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BooksContext, BooksProvider } from "../contexts/BooksContext";
import Search from "./Search";
import { mockBooks } from "../mock/mock.data";
import { IBook } from "../interfaces";

const searchQuery = "popcorn";
const searchMaxResult = "5";
const googleBooksApi = "https://www.googleapis.com/books/v1/volumes";

const server = setupServer(
  rest.get(googleBooksApi, (req: any, res: any, ctx: any) => {
    const query = req.url.searchParams.get("q");
    const maxResults = req.url.searchParams.get("maxResults");
    if (query === searchQuery && maxResults === searchMaxResult) {
      return res(
        ctx.json({
          items: mockBooks,
        })
      );
    } else {
      console.log("error");
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid query parameters" })
      );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Search Books Component", () => {
  it("should render search books content correctly", async () => {
    const { getByTestId } = render(<Search />);
    const searchBooksContent = getByTestId("search-books");
    const searchInput = getByTestId("search-input");
    const searchSubmitBtn = getByTestId("search-submit-btn");
    const searchResultContent = getByTestId("search-result-content");
    expect(searchBooksContent).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchSubmitBtn).toBeInTheDocument();
    expect(searchResultContent).toBeInTheDocument();
  });
  it("should set search results from API", async () => {
    const mockBookValue = {
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchResult: [] as IBook[],
      setSearchResult: jest.fn(),
      readingList: [],
      setReadingList: jest.fn(),
    };

    const { getByTestId } = render(
      <BooksContext.Provider value={mockBookValue}>
        <Search></Search>
      </BooksContext.Provider>
    );

    const searchInput = getByTestId("search-input");
    const searchSubmitBtn = getByTestId("search-submit-btn");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: searchQuery } });
      fireEvent.click(searchSubmitBtn);
    });
    expect(mockBookValue.setSearchQuery).toHaveBeenCalledWith(searchQuery);
    expect(mockBookValue.setSearchResult).toHaveBeenCalledWith(mockBooks);
  });

  it("should render search results from API", async () => {
    const { getByTestId } = render(
      <BooksProvider>
        <Search />
      </BooksProvider>
    );
    const searchInput = getByTestId("search-input");
    const searchSubmitBtn = getByTestId("search-submit-btn");
    const searchResultContent = getByTestId("search-result-content");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: searchQuery } });
      fireEvent.click(searchSubmitBtn);
    });
    expect(searchResultContent).not.toHaveTextContent("No data");
    mockBooks.forEach((book: IBook) => {
      expect(searchResultContent).toHaveTextContent(book.volumeInfo.title);
    });
  });

  it("should render an empty state when the reading list is empty", () => {
    render(
      <BooksProvider
        value={{
          readingList: [],
          setReadingList: jest.fn(),
        }}
      >
        <Search />
      </BooksProvider>
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
