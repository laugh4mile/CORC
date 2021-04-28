## Fabric test network 구성

환경: Ubuntu 20.04  
테스트 네트워크를 활용하는 것으로, 단일 채널, 2개의 피어, 1개의 오더러가 생성된다.

### Docker 설치

REFERENCE: [docs.docker.com/engine/install/ubuntu/](http://docs.docker.com/engine/install/ubuntu/)

```bash
## setup reposity

# Update the apt package index and install packages to allow apt to use a repository over HTTPS
sudo apt update -y
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker’s official GPG key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt -y update
sudo apt -y install docker-ce docker-ce-cli containerd.io
```

### Git, cURL 설치

```bash
sudo apt -y install git curl
```

### Golang 설치

REFERENCE: [https://golang.org/doc/install](https://golang.org/doc/install)

```bash
wget https://golang.org/dl/go1.16.3.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
go version # version check
```

### Fabric, Fabric Sample 설치

```bash
mkdir fabric
cd fabric
curl -sSL https://bit.ly/2ysbOFE | bash -s
```

### .bashrc 환경변수 설정

```bash
# .bashrc
...
export PATH=$PATH:<fabric-samples-path>/bin
export FABRIC_CFG_PATH=<fabric-samples-path>/config/
```