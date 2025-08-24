import Template from "../template/Template";
import useApi from "../api";
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import { ReactReader } from "react-reader";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const StyledWrapper = styled.div`
  height: 500px;
  width: 100%;
`;

export default function ReaderPage() {
  const api = useApi();

  const { id } = useParams();

  useEffect(() => {}, []);
  const [location, setLocation] = useState<string | number>(0);

  return (
    <Template>
      <StyledWrapper>
        <ReactReader
          url={baseUrl + "/book-file/file.epub?id=" + id}
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        ></ReactReader>
      </StyledWrapper>
    </Template>
  );
}
