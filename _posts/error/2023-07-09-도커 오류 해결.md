---
comments: true
layout: post
title: 도커 Job for docker.service failed because the control process exited with error code 해결
date: 2023-07-09 00:42:00 +0900
category: error
---

도커 설치 후 실행을 했더니 이러한 오류가 나왔다.
```bash
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
```

```systemctl status docker```를 통해 도커 상태를 보니 아래와 같은 오류가 있었다
```bash
docker.service: Start request repeated too quickly.
docker.service: Failed with result 'exit-code'.
Failed to start Docker Application Container Engine.
```
<br>

도커를 설치하는 과정에서 데몬에 문제가 생긴 것 같다. 그래서 도커를 완전히 제거하고 다시 설치하려고 했는데.....

몇시간동안 재설치를 해도 같은 오류가 계속 나왔다.... 아마 완전히 제거를 하지 않은 탓인 듯 해서 있는대로 다 삭제하고 다시 설치하니 잘 실행되었다.
아래는 그 과정이다. 참고로 나는 우분투 22.04를 사용 중이다.

<br>
먼저 도커 관련 데몬들을 멈춘다.

```bash
sudo systemctl stop docker.socket
sudo systemctl disable docker.socket
sudo systemctl stop docker.service
```
다음으로 도커 관련된 모든 패키지들을 제거해준다.

```bash
dpkg -l | grep -i docker 
```
도커 관련 패키지들을 위 명령어로 찾아준다.
```bash
sudo apt-get purge -y <package_name>
```
찾은 패키지들을 모두 위 명령어로 제거해준다.

<br>
그리고 아래 명령어들을 차례대로 실행한다.

```bash
sudo rm -rf /var/lib/docker* /etc/docker*
sudo rm -rf /var/run/docker.sock /var/run/dockershim.sock /var/run/docker.pid
sudo rm -rf /var/lib/dockershim /var/run/docker /var/run/dockershim.sock
sudo apt purge docker-ce docker-ce-cli containerd.io
```

<br>
아래 명령어들을 차례대로 실행해 도커를 설치해준다. (우분투 22.04 기준)

```bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

<br>
끝!!