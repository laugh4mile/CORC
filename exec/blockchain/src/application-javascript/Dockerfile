FROM node:14

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package.json ./
RUN npm i

# 앱 소스 가져오기
COPY . .

# 외부 포트 바인딩
EXPOSE 8080

# 실행
CMD ["node", "app.js"]
