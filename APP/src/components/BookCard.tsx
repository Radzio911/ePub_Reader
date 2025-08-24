import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import JsFileDownloader from "js-file-downloader";
import { baseUrl } from "../api";
import { useNavigate } from "react-router-dom";

type BookCardProps = {
  title: string;
  category: string;
  id: string;
  coverUrl: string;
};

export default function BookCard({
  category,
  coverUrl,
  id,
  title,
}: BookCardProps) {
  const navigate = useNavigate();

  const handleDownload = () => {
    const fileUrl = baseUrl + "/book-file/file.epub?id=" + id;

    new JsFileDownloader({
      url: fileUrl,
    })
      .then(function () {
        // Called when download ended
      })
      .catch(function (error) {
        console.log(error);
        // Called when an error occurred
      });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={coverUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{category}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDownload}>
          Download
        </Button>
        <Button
          size="small"
          onClick={() => {
            navigate(`/readbook/${id}`);
          }}
        >
          Read
        </Button>
      </CardActions>
    </Card>
  );
}
