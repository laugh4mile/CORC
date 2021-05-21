# 코르크 (CorC)

`자율프로젝트` `기업연계` `블록체인`

## 프로젝트 소개

블록체인 기반의 경비 관리 시스템 구축 프로젝트입니다. 정합성 검증을 위해 블록체인에 데이터를 추가 작성합니다. 기존의 법인카드 사용, 영수증 제출, 검증 프로세스를 개선하여 결제 시 실시간 검증되는 시스템 구축을 목표로 합니다.

<br>

## 구현 기능

- 경비관리 시스템(Web)
  - 사용자, 가맹점 등 관리 기능
  - 로그 및 통계 조회 기능
- 모바일 지갑 서비스(App)
  - QR 결제 기능
  - 한도 및 결제 내역 조회 기능
- 가맹점 전용 관리 서비스(App)
  - 가맹점 정보 등록 및 신청 기능
  - 정산계좌 등록 및 변경 기능
  - 판매 품목 등록 기능
  - 이용내역 조회 기능
  - 결제 기능

<br>

## 작업 룰

Commit Rule

```bash
type(타입) : title(제목)

body(본문, 생략 가능)

See also : #issue, ...(참고 이슈, 생략 가능)
##################################################
    types = {
      feat : 새로운 기능에 대한 커밋
      fix : 버그 수정에 대한 커밋
      build : 빌드 관련 파일 수정에 대한 커밋
      chore : 그 외 자잘한 수정에 대한 커밋
      ci : CI관련 설정 수정에 대한 커밋
      docs : 문서 수정에 대한 커밋
      style : 코드 스타일 혹은 포맷 등에 관한 커밋
      refactor :  코드 리팩토링에 대한 커밋
      test : 테스트 코드 수정에 대한 커밋
    }

ex)
feat: 로그인 기능 구현 / fix: 회원가입 수정
```

브랜치 관리

```bash
(master) -> (develop) -> (feature/frontend(backend)/feature명)
```

- master : 배포 가능한 상태로 유지
- develop : 개발용 최상위 branch
- feature : 기능별 branch

<br>

## 팀원 소개

- **이혜진** - _PM, Frontend_
- **곽지원** - _Backend_
- **윤현수** - _Frontend, Backend_
- **정지환** - _Blockchain_
- **주정훈** - _Backend, Server_

<br>

## 🚀 기술 스택

### Programming Languages

<img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="Java" src="https://img.shields.io/badge/java-%23ED8B00.svg?&style=for-the-badge&logo=java&logoColor=white"/>
<img alt="Go" src="https://img.shields.io/badge/go-%2300ADD8.svg?&style=for-the-badge&logo=go&logoColor=white"/>

### Framework

<img alt="Spring" src="https://img.shields.io/badge/spring%20-%236DB33F.svg?&style=for-the-badge&logo=spring&logoColor=white"/>
<img alt="Maven" src="https://img.shields.io/badge/maven%20-%2335495e.svg?&style=for-the-badge&logo=maven&logoColor=%234FC08D"/>
<img alt="JPA" src="https://img.shields.io/badge/jpa%20-%23009639.svg?&style=for-the-badge&logo=jpa&logoColor=white"/>
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img alt="React Native" src="https://img.shields.io/badge/react_native-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/>

### Design

<img alt="Figma" src="https://img.shields.io/badge/figma%20-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white"/> <img alt="Adobe Illustrator" src="https://img.shields.io/badge/adobe%20illustrator%20-%23FF9A00.svg?&style=for-the-badge&logo=adobe%20illustrator&logoColor=white"/>

### Hosting/SaaS

<img alt="AWS" src="https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/>

### Servers

<img alt="Nginx" src="https://img.shields.io/badge/nginx%20-%23009639.svg?&style=for-the-badge&logo=nginx&logoColor=white"/>

### Databases

<img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>

### Blockchain

<img alt="Fabric" src="https://img.shields.io/badge/fabric%20-%23f0554a.svg?&style=for-the-badge&logo=hyperledger&logoColor=white"/>

### DevOps

<img alt="Docker" src="https://img.shields.io/badge/Docker-%232496ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/>

<br>
<br>

## 프로젝트 실행하기

[설치 방법](./exec/INSTALL.md) 참고
