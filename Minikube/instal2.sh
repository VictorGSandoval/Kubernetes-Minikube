#! /bin/bash

echo "Install dependencies"
sudo apt update -y
sudo apt install -y curl wget apt-transport-https ca-certificates gnupg lsb-release conntrack

echo "Install docker"
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt install docker-ce docker-ce-cli containerd.io -y

echo "Docker user root"
sudo usermod -aG docker $USER
sudo newgrp docker

echo "Install Kubectl"
sudo curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo mv kubectl /bin/kubectl
sudo chmod a+x /bin/kubectl

echo "Install Minikube"
sudo curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/bin/minikube
sudo chmod +x /usr/bin/minikube

echo "Install the cri-dockerd"

echo "Install Golang"
sudo wget https://storage.googleapis.com/golang/getgo/installer_linux
sudo chmod +x ./installer_linux
sudo ./installer_linux
sudo source ~/.bash_profile

echo "Build the cri-dockerd"
sudo git clone https://github.com/Mirantis/cri-dockerd.git
sudo cd cri-dockerd
sudo mkdir bin
sudo go get && go build -o bin/cri-dockerd
sudo mkdir -p /usr/local/bin
sudo install -o root -g root -m 0755 bin/cri-dockerd /usr/local/bin/cri-dockerd
sudo cp -a packaging/systemd/* /etc/systemd/system
sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
sudo systemctl daemon-reload
sudo systemctl enable cri-docker.service
sudo systemctl enable --now cri-docker.socket

echo "Install the crictl"
VERSION="v1.24.2"
sudo wget https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-$VERSION-linux-amd64.tar.gz
sudo tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
sudo rm -f crictl-$VERSION-linux-amd64.tar.gz

echo "Congratulations installation done"
echo "Only Run: minikube start --vm-driver=none"
