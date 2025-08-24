import { useState, type BaseSyntheticEvent } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import useApi from "../api";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddBookForm({ onAddBook = () => {} }: any) {
  const api = useApi();
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<FileList | null>();
  const [category, setCategory] = useState("category1");

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    const file = files ? files[0] : "";

    formData.append("epub", file);

    api.post("/new-book", formData).then((data) => {
      onAddBook(data.data.id);
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography variant="h5">AddBook</Typography>
      <TextField
        variant="filled"
        label="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></TextField>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {files ? files[0].name : "upload file"}
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => setFiles(event.target.files)}
          multiple
        />
      </Button>
      <FormControl fullWidth>
        <InputLabel id="category">kategoria</InputLabel>
        <Select
          labelId="category"
          value={category}
          label="Category"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <MenuItem value={"category1"}>Kategoria</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </StyledForm>
  );
}
