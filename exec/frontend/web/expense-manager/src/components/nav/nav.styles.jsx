import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavContainer = styled.div`
  width: 20vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: center;
  color: #a5a5a8;
  background-color: white;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  /* justify-content: flex-end; */
`;

export const OptionsTitle = styled.span`
  font-weight: 700;
  font-size: 0.75rem;
  margin-left: 4rem;
`;

const activeClassName = "nav-link-active";

export const OptionLink = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem auto;
  color: #a5a5a8;

  svg {
    width: 50%;
  }

  &.${activeClassName} {
    font-weight: 700;
    color: #7986ff;
  }
`;

export const OptionDivider = styled.div`
  border-bottom: 2px solid #a5a5a8;
  width: 75%;
`;
