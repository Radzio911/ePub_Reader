import styled from "styled-components";
import NavBar from "../components/NavBar";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 64px);
  justify-content: center;
`;

type TemplateProps = { children: any };

export default function Template({ children, ...props }: TemplateProps) {
  return (
    <div>
      <NavBar></NavBar>
      <StyledContent>{children}</StyledContent>
    </div>
  );
}
