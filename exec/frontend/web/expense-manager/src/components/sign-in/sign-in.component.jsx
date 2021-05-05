import React from "react";
import { connect } from "react-redux";

import BaseButton from "../ui/base-button/base-button.component";
import BaseCard from "../../components/ui/base-card/base-card.component";
import BaseInput from "../../components/ui/base-input/base-input.component";

import { signInStart } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

import {
  SignInContainer,
  LogoContainer,
  TitleContainer,
  SubTitleContainer,
  SubTitleBold,
  ButtonContainer,
} from "./sign-in.styles";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { signInStart } = this.props;
    const { email, password } = this.state;

    signInStart(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInContainer>
        <LogoContainer>
          <TitleContainer>코르크</TitleContainer>
          <SubTitleContainer>
            for <SubTitleBold>Administrator</SubTitleBold>
          </SubTitleContainer>
        </LogoContainer>
        <BaseCard>
          <form onSubmit={this.handleSubmit}>
            <BaseInput
              name="email"
              type="email"
              value={this.state.email}
              handleChange={this.handleChange}
              label="아이디"
              required
            />
            <BaseInput
              name="password"
              type="password"
              value={this.state.password}
              handleChange={this.handleChange}
              label="비밀번호"
              required
            />
            <ButtonContainer>
              <BaseButton type="submit">로그인</BaseButton>
            </ButtonContainer>
          </form>
        </BaseCard>
      </SignInContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
