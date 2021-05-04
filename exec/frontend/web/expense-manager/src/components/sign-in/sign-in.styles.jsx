import styled from "styled-components";
import BaseButton from "../ui/base-button/base-button.component";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 100vh;
  background-color: #f9fbff;
`;

export const LogoContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-top: 7rem;
  margin-bottom: 1.5rem;
`;

export const TitleContainer = styled.span`
  margin: 0 auto;
  width: fit-content;
  background: -webkit-linear-gradient(top left, #32499a, #7986ff, #d3deff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3.75rem;
  font-family: "BMDOHYEON";
`;

export const SubTitleContainer = styled.span`
  color: #32499a;
  letter-spacing: 0.1em;
  font-size: 1.25rem;
`;

export const SubTitleBold = styled.span`
  font-weight: 700;
`;

export const SignInButton = styled(BaseButton)``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
