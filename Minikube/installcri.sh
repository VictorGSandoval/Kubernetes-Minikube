#! /bin/bash
sudo -i
echo "Inicio"
sudo curl -Lo go_installer https://get.golang.org/$(uname) && chmod +x go_installer && ./go_installer && rm go_installer
go version

echo "Finish"
