import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: calc(100% - 20px);
  height: 100px;

  border-radius: 15px !important;
  background: #ffffff;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;

  padding: 10px;

  margin: 10px;
`;

interface Props {
  children?: React.ReactNode;
}

const ContentBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default ContentBox;
