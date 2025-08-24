import { useNavigate } from "react-router-dom";
import AddBookForm from "../forms/AddBookForm";
import Template from "../template/Template";
import ReaderPage from "./ReaderPage";

export default function AddBookPage() {
  const navigate = useNavigate();
  const handleAddBook = (id: string) => {
    navigate(`/readbook/${id}`);
  };

  return (
    <Template>
      <AddBookForm onAddBook={handleAddBook} />
    </Template>
  );
}
