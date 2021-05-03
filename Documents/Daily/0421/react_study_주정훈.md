# 프로젝트 생성 및 실행
```
react 프로젝트 생성을 위한 npm install
npm install -g create-react-app

프로젝트 생성
// npx
npx create-react-app AppName
// npm
npm init react-app AppName
// yarn
yarn create react-app AppName

경로 변경
cd AppName

프로젝트 실행
<!-- npm -->
npm start

<!-- yarn -->
yarn start
```

## VSCode 사용시 사용하면 괜찮을 Extension

- ES7 React/Redux/GraphQL/React-Native snippets
- Prettier - Code formatter

# Component

함수 컴포넌트(Function Component) 와 클래스 컴포넌트(Class Component)

## 함수 컴포넌트 = stateless component

prop 데이터만 받아서 html을 return 할 경우 사용

```
function Welcome(props) {
  return (
      <h1>{props.message}, {props.name}</h1>
    );
}

function Welcome({message, name}) {
  return (
      <h1>{message}, {name}</h1>
    );
}

// prop type 설정
Welcome.porpTypes = {
    message : PropTypes.string.isRequired
}
```

## 클래스 컴포넌트 = state component
```
import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <h1>Hello, {props.name}</h1>
    );
  }
}
```

## prop 데이터의 타입 설정 가능
```
// prop-types install
// npm
npm install --save prop-types
// yarn
yarn add prop-types

// how to use on class Componenet
import PropTypes from 'prop-types';

class A extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        poster: PropTypes.string
    }
    ...
}

// how to use on function component
function A(props) {
    ...
}

A.propTypes = {
    propName: PropTypes.string.isRequired,
    propName2: PropTypes.number,
    ...
}

```

### Life Cycle
- Render
    - componentWillMount() -> render() -> componentDidMount()
- Update
    - componentWillReceiveProps() -> 
        shouldComponentUpdate() == true -> 
        componentWillUpdate() -> // ex) set spinner, loading
        render() -> 
        componentDidUpdate() // ex) disable spinner, loading, etx


# 배열의 각 요소에 접근 하기

## 사용방법 : Map

```
const data = ['a','b','c'];
return (
    <div>{data.map(item => 
        <h1 key={item.toString()}> {/* for unique key warning */}
            {item}
        </h1>
    )}</div>

    {/* use return */}
    <div>{data.map(item => 
        return (<h1 key={item.toString()}> {/* for unique key warning */}
            {item}
        </h1>);
    )}</div>

    <div>{data.map(item => 
        {/* if data have unique 'key' and the name is 'id' */}
        <h1 key={item.id}>
            {item}
        </h1>
    )}</div>

    {/* if data have no unique 'key' */}
    <div>{data.map((item, index) => 
        <h1 key={index}>
            {item}
        </h1>
    )}</div>
);
```

### .map VS .forEach

- map
    - 각 아이템 별로 function 실행 후 결과 반환
- forEach
    - 각 아이템 별로 function 실행, 결과 반환 x (no return)

# state

클래스 컴포넌트에서 사용할 수 있음

```
class Hello extends Component {
    // 선언
    state = {
        dataA: 'dataA',
        movies: [
            {
                title: 'movieA',
                poster: 'movieA_poster_URL'
            },
            {
                title: 'movieB',
                poster: 'movieB_poster_URL'
            }
        ]
    }

    // state 사용
    render() {
        return (
            <h1>{this.state.dataA}</h1>
        )
    }

    // state 변경 : direct change 안됨
    componenetDidMount() {
        setTimeout(() => {
            this.setState({
                dataA: 'dataA changed'
            })
        }, 3000)
    } // 3초 후 dataA 변경

    // state Array 추가
    componenetDidMount() {
        setTimeout(() => {
            this.setState({
                movies: [
                    ...this.state.movies,
                    {
                        title: 'movieName'
                        poster: 'moviePosterImageURL'
                    }
                ]
            })
        }, 3000)
    }   // 3초 후 이전 영화 리스트 그대로 두고, 영화 한 개 추가
}
```

## state 에 데이터 없을 때 loading
```
class App extends React.Component {
    render() {
        return (
            <div>
                {/* 3항 연산자 */}
                {
                    this.state.movies ? this.renderMovies() : <h2>Loading...</h2> // 단순 텍스트만 사용할 경우 문자열로
                }
            </div>
        )
    }

    renderMovies = () => {
        const movies = this.state.movies.map((movie, index) => {
            return (
                <Movie title={movie.title} poster={movie.poster} key={index} />
            )
        })
        return movies
    };
}

export default App;
```

# 조심해야할 부분

## modern JS
```
() => {
    ...
}

// 단순 return 만 있는 경우
() => returnData;
```

## import

import 파일할 때 확장자가 다른 동일한 이름의 파일이 존재할 경우에는 에러가 발생.

파일 이름을 다르게 명시하거나, 확장자명까지 붙여서 import !!


# Routing

별도로 제공하는 기능이 없음

## npm 설치
```
// npm
npm install react-router-dom
// yarn
yarn add react-router-dom
```

## 사용
```
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

<BrowserRouter>
    <Link to="/" >Home</Link>
    <Link to="/about" >About</Link>
    <Link to="/users" >Users</Link>
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/users>
            <Users/>
        <Route>
    </Switch>
</BrowserRouter>
```

# Reactjs 기반 웹 앱 개발시 사용할 만한 NPM Packages
- react-router-dom
- prop-types