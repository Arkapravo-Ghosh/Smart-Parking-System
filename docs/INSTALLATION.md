# Installation
## Prerequisites
- Raspberry Pi 3 Model B or higher
- Debian-based OS (Raspberry Pi OS, Ubuntu, DietPi, etc.)
- NodeJS LTS Hydrogen (v18.16.0)
## Installation Steps
- [Backend](INSTALLATION.md#backend)
- [Frontend](INSTALLATION.md#frontend)
## Backend
> **Note:** This is required to be run on the Raspberry Pi. Root privileges are necessary for all the steps.
- Open Root Shell
```bash
sudo -i
```
- Clone this repository
```bash
git clone https://github.com/Arkapravo-Ghosh/Smart-Parking-System.git
```
- Navigate to the `server` directory
```bash
cd Smart-Parking-System/src/server
```
- Deploy the Server
```bash
./deploy.sh
```
- Connect the IR Sensors to the Raspberry Pi according to the config file and it should work as expected. If you want to change the config file, you can do so by editing `/etc/sps-pins.conf` and it will be updated automatically.\
For example, if you want Pin 15 (GPIO 22) and Pin 16 (GPIO 23), `/etc/sps-pins.conf` should look like this:
```
15
16
```
Refer to the following diagram for the pin configuration:
<div align=center>
    <img width=500 src="images/pin-config.png">
</div>

The API will now be available at `http://localhost:333/api`
> **NOTE:** The API is accessible to anyone on the network who knows the IP address of the Raspberry Pi.
## Frontend
> **Note:** This is required to be run on a Linux machine. Doesn't necessarily have to be a Raspberry Pi. Root privileges are necessary for all the steps.
- Open Root Shell
```bash
sudo -i
```
- Clone this repository
```bash
git clone https://github.com/Arkapravo-Ghosh/Smart-Parking-System.git
```
- Navigate to the `client` directory
```bash
cd Smart-Parking-System/src/client
```
- Deploy the Frontend
```bash
./deploy.sh
```
> **NOTE:** This script will ask for APU_URL. If the IP Address of the Raspberry Pi is `XXX.XXX.XX.XX`, then the API URL will be `http://XXX.XXX.XX.XX:333/api`.

The frontend will be available at `http://localhost`.
> **NOTE:** The frontend is accessible to anyone on the network who knows the IP address of the machine.
