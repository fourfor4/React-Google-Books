import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IBook } from "../interfaces";

type TBooksContext = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResult: IBook[];
  setSearchResult: Dispatch<SetStateAction<IBook[]>>;
};

export const BooksContext = createContext<TBooksContext>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchResult: [],
  setSearchResult: () => {},
});

export const BooksProvider = ({ ...props }) => {
  const { children } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IBook[]>([]);

  return (
    <BooksContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResult,
        setSearchResult,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
