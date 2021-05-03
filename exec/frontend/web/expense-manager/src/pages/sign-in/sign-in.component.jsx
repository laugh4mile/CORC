import React from "react";

import BaseCard from "../../components/ui/base-card/base-card.component";
import BaseInput from "../../components/ui/base-input/base-input.component";
import BaseButton from "../../components/ui/base-button/base-button.component";

import "./sign-in.styles.scss";

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/web`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json;",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      // data.email
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log("error signing in", error.message);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <div className="logo">
          <span className="title dohyeon">코르크</span>
          <span className="subtitle">
            for <span className="font-bold">Administrator</span>
          </span>
        </div>
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
            <div className="flex justify-center">
              <BaseButton type="submit">로그인</BaseButton>
            </div>
          </form>
        </BaseCard>
      </div>
    );
  }
}

export default SignInPage;
