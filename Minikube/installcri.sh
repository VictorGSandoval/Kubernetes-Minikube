#!/bin/bash
sudo -i
echo "Inicio"
git clone https://github.com/Mirantis/cri-dockerd.git
wget https://storage.googleapis.com/golang/getgo/installer_linux
chmod +x ./installer_linux
./installer_linux
source /root/.bash_profile
go version

echo "Finish"
