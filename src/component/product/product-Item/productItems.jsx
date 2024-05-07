import styled from "styled-components";
import Image from "next/image";

export const StyledImage = styled(Image)`
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    width: 20px;
    background-color: #8b0000; // Dark red color
    color: #fff; // White text color
    text-align: center;
    line-height: 20px;
    box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5); // Shadow effect
  }
`;
