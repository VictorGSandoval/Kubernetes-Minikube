# Minikube on Ubuntu (Focus on Cloud)

> In this demo, we will cover the installation of Minikube on Ubuntu 20.04

### Minimum system requirements
```
2 GB RAM or more
2 CPU / vCPU or more
20 GB free hard disk space or more
Docker
Preference Run User ROOT 
```
### Install dependencies
```
sudo apt update -y
sudo apt install -y curl wget apt-transport-https ca-certificates gnupg lsb-release conntrack
```

### Install docker from official repository
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt install docker-ce docker-ce-cli containerd.io -y
docker --version
```
##### Run docker as non-root user
```
#sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```


### Install Kubectl

https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
mv kubectl /bin/kubectl
chmod a+x /bin/kubectl
```

### Install Minikube

```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/bin/minikube
sudo chmod +x /usr/bin/minikube
```
### The none driver with Kubernetes v1.24+ and the docker container-runtime requires cri-dockerd.

https://github.com/kubernetes/minikube/issues/14410
    https://github.com/Mirantis/cri-dockerd#build-and-install

##### Install the cri-dockerd
```
git clone https://github.com/Mirantis/cri-dockerd.git
```
##### Install Golang Skip If present 
```
wget https://storage.googleapis.com/golang/getgo/installer_linux
chmod +x ./installer_linux
./installer_linux
source ~/.bash_profile
```
##### Build the cri-dockerd 
```
cd cri-dockerd
mkdir bin
go get && go build -o bin/cri-dockerd
mkdir -p /usr/local/bin
install -o root -g root -m 0755 bin/cri-dockerd /usr/local/bin/cri-dockerd
cp -a packaging/systemd/* /etc/systemd/system
sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
systemctl daemon-reload
systemctl enable cri-docker.service
systemctl enable --now cri-docker.socket`
```
### Need to install crictl from cri-tools (new for 1.24)
https://github.com/kubernetes/minikube/issues/14676
    https://github.com/kubernetes-sigs/cri-tools
##### Install the crictl
```
VERSION="v1.24.2"
wget https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-$VERSION-linux-amd64.tar.gz
sudo tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
rm -f crictl-$VERSION-linux-amd64.tar.gz
```

# Congratulations installation done  

> Only Run: minikube start --vm-driver=none

> The following steps are tests

### Minikube commands
```
minikube start --vm-driver=none
minikube addons list
minikube addons enable ingress
minikube dashboard
minikube stop
```
### Start Minikube with higher resources
```
minikube config set cpus 2
minikube config set memory 8192
minikube start
```

### Test the setup
```
kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl expose pod hello-minikube --type=NodePort
```
### Authors
Victor Sandoval
