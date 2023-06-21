import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("should render corrently", () => {
    render(<App />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("should render the search page by default", () => {
    render(<App />);
    expect(screen.getByTestId("search-books")).toBeInTheDocument();
  });

  it("should render the reading list page when the path is /readinglist", () => {
    window.history.pushState({}, "Reading List", "/readinglist");
    render(<App />);
    expect(screen.getByTestId("reading-list")).toBeInTheDocument();
  });
});
