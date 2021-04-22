# AWS EC2 Docs

> **hostname**: 13.124.31.179
**port**: 3306
**Username**: ssafy
**Password**: ssafy

> Domain : 
k4a301.p.ssafy.io

# Tip

- 윈도우에서 복사 후, cmd창에서 **우클릭**으로 붙여넣기 가능!
- 슈퍼유저 권한이 필요한 명령어인데 매번 쓰기 싫은 경우

    ```bash
    sudo su
    ```

- 공인 ip 주소 확인

    ```bash
    curl [ipecho.net/plain;](http://ipecho.net/plain;) echo
    ```

# EC2 서버 접속

- .pem 파일 위치 폴더 가서

```bash
ssh -i K4A301T.pem ubuntu@k4a301.p.ssafy.io
```

```bash
# Frontend
cd s04p31a301/exec/front/halal-times
npm run serve

# Backend
cd s04p31a301/exec/
```

# 시스템 업데이트

```bash
sudo apt-get update && sudo apt-get upgrade
```

# MySQL 설정

## EC2 설정

```bash
# mysql 설치
sudo apt install mysql-server
Y # 공간 사용

# mysql 설치 확인
dpkg -l | grep mysql-server
# mysql 구동 확인
ps -ef | grep mysql

# mysql 접속
sudo mysql -u root -p
password: root # root 계정 비밀번호

# 사용자 생성
create user '유저명'@'%' identified by '비밀번호';
grant all privileges on *.* to '유저명'@'%' with grant option; # 유저에게 외부접속 권한 주기
FLUSH PRIVILEGES;
exit

# 외부 접속 허용 {
cd /etc/mysql/mysql.conf.d
sudo vi mysqld.cnf

# vi창에서
> i
bind-address = 0.0.0.0

# 수정 후 esc -> :wq 입력 후 엔터 : 저장
# }

# mysql 재시작
sudo service mysql restart
```

## Windows MySQL Workbench 설정

![Untitled](/uploads/ce37348a98392cfee6e55e366acb03b2/Untitled.png)

1. 서버 추가
2. 이름 설정
3. EC2 정보 입력

    Hostname: {AWS EC2의 공인 IPv4 주소}

    Username: {생성한 사용자 이름}

    Password: {비밀번호}

4. 연결 테스트 → Successfully Connection 체크
5. 확인

## Windows에서 작업한 내용 EC2에서 확인하기

```bash
mysql -u ssafy -p
/ssafy
use shinhan; (스키마 바꾸기)
show tables;
```