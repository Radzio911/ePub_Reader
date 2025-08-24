import BookCard from "../components/BookCard";
import Template from "../template/Template";
import useApi from "../api";
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import styled from "styled-components";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  width: 100%;
  padding: 10px;
  gap: 10px;
`;

type Book = {
  title: string;
  file: string;
  category: string;
  user: string;
  _id: string;
};

export default function HomePage() {
  const api = useApi();
  const [books, setbooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get("/my-books").then((data) => {
      setbooks(data.data.books);
    });
  }, []);

  return (
    <Template>
      <StyledGrid>
        {books.map((book) => (
          <BookCard
            key={book._id}
            category={book.category}
            coverUrl={baseUrl + "/cover?id=" + book._id}
            id={book._id}
            title={book.title}
          />
        ))}
      </StyledGrid>
    </Template>
  );
}
