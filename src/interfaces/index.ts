export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    description?: string;
  };
}
