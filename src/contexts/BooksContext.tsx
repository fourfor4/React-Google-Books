import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IBook } from "../interfaces";

type TBooksContext = {
  readingList: IBook[];
  setReadingList: Dispatch<SetStateAction<IBook[]>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResult: IBook[];
  setSearchResult: Dispatch<SetStateAction<IBook[]>>;
};

export const BooksContext = createContext<TBooksContext>({
  readingList: [],
  setReadingList: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  searchResult: [],
  setSearchResult: () => {},
});

export const BooksProvider = ({ ...props }) => {
  const { children } = props;
  const localReadingList = localStorage.getItem("readingList") || "[]";
  const [readingList, setReadingList] = useState<IBook[]>(
    JSON.parse(localReadingList)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IBook[]>([]);

  return (
    <BooksContext.Provider
      value={{
        readingList,
        setReadingList,
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
