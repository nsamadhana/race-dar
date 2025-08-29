import styled from "styled-components";

export const StyledButton = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "#2e186a"};
  color: orange;
  font-size: 1.5rem;
  font-weight: 700;
  width: 150px;
  min-width: 150px;
  border: 1px solid #edf3f5;
  border-radius: 4px;
  padding: 13px 10px;
  cursor: pointer;
  margin: 0.625rem 0.625rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid rgb(255, 130, 92);
    background-color: rgb(255, 130, 92);
  }

  @media only screen and (max-width: 480px) {
    font-size: 1rem;
    padding: 10px 8px;
    margin: 0.3rem 0.2rem;
    max-width: none;
    width: calc(100% - 0.4rem);
  }
`;
