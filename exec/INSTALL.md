## 사전 의존성 설치

### Docker 설치

```bash
# REFERENCE: https://docs.docker.com/engine/install/ubuntu/
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt -y update
sudo apt -y install docker-ce docker-ce-cli containerd.io
sudo apt install docker-compose
```

### JDK 설치

```bash
sudo apt install openjdk-11-jdk
```

### Node 설치

```bash
sudo apt install -y nodejs npm
```

### Golang 설치

```bash
# REFERENCE: https://golang.org/doc/install
wget https://golang.org/dl/go1.16.3.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.3.linux-amd64.tar.gz
sudo echo -e "\n# Golang configuration" >> ~/.bashrc
# **fabric-samples 경로 확인**
sudo echo export PATH=\$PATH:/usr/local/go/bin" >> ~/.bashrc
```

### Hyperledger Fabric 설치

```bash
# Dependency
sudo apt -y install git curl
# fabric-samples 디렉토리 생성, fabric 도커 이미지 설치
curl -sSL https://bit.ly/2ysbOFE | bash -s
cd fabric-samples/test-network
./network
```

### Fabric 환경변수 설정

```bash
sudo echo -e "\n# Fabric configuration" >> ~/.bashrc
# **fabric-samples 경로 확인**
sudo echo "export PATH=\$PATH:<fabric-samples-path>/bin" >> ~/.bashrc
sudo echo "export FABRIC_CFG_PATH=<fabric-samples-path>/config/" >> ~/.bashrc
```

## CORC Server 설치

### Pull project

```bash
git pull https://lab.ssafy.com/s04-final/s04p31a301.git
```

### Fabric 네트워크 구성

```bash
cd s04p31a301/exec/blockchain/test-network

sudo chown $USER:$USER -R .
sudo find . -name "*.sh" -exec chmod 764 {} \;
sudo ./network.ssh up createChannel -c mychannel -ca

sudo rm log.txt
sudo chown $USER:$USER -R .
./network.sh deployCC -ccn basic -ccp ../src/chaincode-go/ -ccl go
```

### Chaincode API 구성

```bash
cd s04p31a301/exec/blockchain/src/application-javascript
mkdir config
cp ../../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json config/.

sed -i 's/grpcs:\/\/localhost:7051/grpcs:\/\/peer0.org1.example.com:7051/' config/connection-org1.json
sed -i 's/https:\/\/localhost:7054/https:\/\/ca_org1:7054/' config/connection-org1.json

sudo docker build -t restapi_image .
sudo docker run --network fabric_test --name restapi -d restapi_image
```

### Database 구성

```bash
sudo docker run --network fabric_test --name mysql -e MYSQL_ROOT_PASSWORD=MEkzPn68nsYv73NnVHVg -e MYSQL_DATABASE=shinhan -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

### Backend 구성

```bash
cd s04p31a301/exec/backend
sudo chmod 764 mvnw
./mvnw package -DskipTests

cd target
touch Dockerfile # Dockerfile 하단 참조

# Docerfile 작성 이후
sudo docker build -t backend_image .
sudo docker run --network fabric_test -d --name backend -v /usr/share/zoneinfo/Asia/Seoul:/etc/localtime:ro backend_image
```

### Backend Dockerfile 작성

```dockerfile
FROM openjdk:11
EXPOSE 8080
WORKDIR /home
ADD shinhan-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-jar", "shinhan-0.0.1-SNAPSHOT.jar"]
```

### Domain, TLS 설정

```bash
# 도메인 사전 발급, nginx.conf 수정
# 도메인 corc.tk로 테스트 진행
docker run -it --rm --name certbot \
  -v '/etc/letsencrypt:/etc/letsencrypt' \
  -v '/var/lib/letsencrypt:/var/lib/letsencrypt' \
  certbot/certbot certonly -d '*.corc.tk' -d 'corc.tk' --manual --preferred-challenges dns --server 'https://acme-v02.api.letsencrypt.org/directory'

# 발급된 토큰을 _acme-challenge 의 TXT 레코드에 등록
# 총 2회 진행 후 발급됨
# 레코드 적용 확인은 dig 명령어 사용
```

### Frontend Dockerfile

```dockerfile
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY proxy.conf /etc/nginx/proxy.conf
COPY fastcgi.conf /etc/nginx/fastcgi.conf
```

### Nginx 설정 파일 샘플

fastcgi.conf

```nginx
fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  QUERY_STRING       $query_string;
fastcgi_param  REQUEST_METHOD     $request_method;
fastcgi_param  CONTENT_TYPE       $content_type;
fastcgi_param  CONTENT_LENGTH     $content_length;
fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
fastcgi_param  REQUEST_URI        $request_uri;
fastcgi_param  DOCUMENT_URI       $document_uri;
fastcgi_param  DOCUMENT_ROOT      $document_root;
fastcgi_param  SERVER_PROTOCOL    $server_protocol;
fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;
fastcgi_param  REMOTE_ADDR        $remote_addr;
fastcgi_param  REMOTE_PORT        $remote_port;
fastcgi_param  SERVER_ADDR        $server_addr;
fastcgi_param  SERVER_PORT        $server_port;
fastcgi_param  SERVER_NAME        $server_name;
fastcgi_param  REDIRECT_STATUS    200;
```

proxy.conf:

```nginx
proxy_redirect          off;
proxy_set_header        Host            $host;
proxy_set_header        X-Real-IP       $remote_addr;
proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
client_max_body_size    10m;
client_body_buffer_size 128k;
proxy_connect_timeout   90;
proxy_send_timeout      90;
proxy_read_timeout      90;
proxy_buffers           32 4k;
```

nginx.conf:

```nginx
user       nginx;  ## Default: nobody
worker_processes  auto;  ## Default: 1
pid        /var/run/nginx.pid;
worker_rlimit_nofile 8192;

events {
  worker_connections  4096;  ## Default: 1024
}

http {
  include    /etc/nginx/mime.types;
  include    /etc/nginx/proxy.conf;
  include    /etc/nginx/fastcgi.conf;

  default_type application/octet-stream;
  access_log   /var/log/nginx/access.log;
  error_log  /var/log/nginx/error.log;
  sendfile     on;
  tcp_nopush   on;

  server {
    listen       80;
    server_name  corc.tk www.corc.tk;
    root         /home;
    index        index.html;

    location / {
      return 301 https://$server_name$request_uri;
    }
  }

	# 기존 도메인이 있을 경우 리다이렉션
	server {
    listen       80;
    server_name  k4a301.p.ssafy.io;

    location / {
      return 301 $scheme://corc.tk$request_uri;
    }
  }

  server {
    listen       443 ssl;
    server_name  corc.tk www.corc.tk;
    root         /home;
    index        index.html;

    ssl_certificate /etc/letsencrypt/live/corc.tk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/corc.tk/privkey.pem;

    location / {
      try_files $uri $uri/ /index.html;
    }

    location /chain-api/ {
        proxy_pass http://restapi:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept';
    }

		location /api/ {
        proxy_pass http://backend:8765/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept';
    }
  }
}
```

### Frontend 구성

```bash
cd s04p31a301/exec/frontend/web/expense-manager

sudo npm run build
sudo docker build -t frontend_image .
sudo docker run -p 80:80 -p 443:443 --network fabric_test -v /etc/letsencrypt/:/etc/letsencrypt/ --name frontend -d -v <git-repo>/exec/frontend/web/expense-manager/build:/home frontend_image
```

## CORC App 설치

```bash
# Expo CLI 설치
npm install --global expo-cli

# CORC 임직원용
cd exec/app/CORC_E
# CORC 가맹점용
cd exec/app/CORC_B

npm install
```

```js
// App.js, app.json 등의 파일이 존재하는 CORC_E, CORC_B의 루트 디렉토리에 `env.js`파일을 생성 후, 편집합니다.
// `env.js` 파일이 존재한다면, 그 파일을 수정합니다.
export const SERVER_URL = "YOUR_BACKEND_SERVER_API_URL";
```

```bash
## 앱을 실행하기 위한 사전작업으로,
## 핸드폰에 `Expo App`을 설치하거나
## PC에 에뮬레이터 설치 후, 에뮬레이터에 `Expo App`을 설치해야 합니다.

# Run
npm start
# or
yarn start
```

## App 간단 설치
```bash
# CORC 임직원용 apk 다운로드 링크
https://expo.io/artifacts/3d9bf803-b7cd-4353-9a95-6c36341b2e4e
# CORC 가맹점용 apk 다운로드 링크
https://expo.io/artifacts/a7309e51-b939-4df1-bda7-76e377181a24
```
