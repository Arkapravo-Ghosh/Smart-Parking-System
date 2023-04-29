# Smart Parking System
![](https://img.shields.io/badge/license-AGPLv3-blue)
![](https://img.shields.io/badge/languages-raspberrypi%2C%20linux%2C%20nodejs%2C%20expressjs%2C%20reactjs-blue)
<!--
</div>
<div align=center>
<img height="150" src="https://raw.githubusercontent.com/Arkapravo-Ghosh/img/main/ureckon-logo.jpg"></img>
</div>
-->
### Project Name: Smart Parking System
<!--
### Made by:
* Sankalpa Dutta, 1st Year, CSE (IoT)
* Dhruba Dutta Banik, 1st Year, CSE (IoT)
* Disha Laskar, 1st Year, CST
* Arkapravo Ghosh, 1st Year, CSE (IoT)
* Mahak Gupta, 2nd Year, CST
-->
# Hardware
<details>
    <summary>Using Arduino Uno and A Linux Server</summary>

## Linux Server
Configure the Linux Server to run [this file](src/server/main.py) on boot by putting [this SystemD Service File](src/server/uic-project-ard.service) into `/etc/systemd/system/`. This file will capture data from Serial.
> Note: The username in both these files are configured to be `arkapravo` and thus the path to the files. If necessary, edit them to support your configuration.

Then, run the following command:

`sudo systemctl daemon-reload && sudo systemctl enable uic-project-ard.service`

## Arduino Uno
Upload the [Source Code](src/arduino/main/main.ino) to Arduino Uno Board, then create the circuit as shown below:
<p align="center"><a><img height="500" src="https://raw.githubusercontent.com/Arkapravo-Ghosh/img/main/circuit_diagram.png"></a>&nbsp;&nbsp;</p>

> This circuit will read the data from the IR sensors and send it to the Linux Server via Serial Monitor.

</details>

<details>
    <summary>Using Raspberry Pi</summary>

## Raspberry Pi
Configure the Raspberry Pi to run [this file](src/alternate/main.py) on boot by putting [this SystemD Service File](src/alternate/uic-project.service) into `/etc/systemd/system/`. This file will capture data from the IR sensors via GPIO Pins and store it in a MariaDB Database.
> Note: The username in both these files are configured to be `arkapravo` and thus the path to the files. If necessary, edit them to support your configuration.

Then, run the following command:

`sudo systemctl daemon-reload && sudo systemctl enable uic-project.service`

Refer to the following diagram for Rasberry Pi 4 Model B to understand GPIO Pins
<p align="center"><a><img height="500" src="https://raw.githubusercontent.com/Arkapravo-Ghosh/img/main/GPIO-Pinout-Diagram-2.png"></a>&nbsp;&nbsp;</p>

* Connect Ground Pin of Raspberry Pi to the GND Pins of both the IR Sensors
* Similarly, connect any of the 5V Power pins of Raspberry Pi to the VCC Pins of both the IR Sensors
* Connect GPIO 22 (Pin 15) of Raspberry Pi to OUT Pin of the IR Sensor at Parking Slot 1
* Similarly, connect GPIO 23 (Pin 16) of Raspberry Pi to OUT Pin of the IR Sensor at Parking Slot 2

</div>
<div align=center>
<img height="600" src="https://raw.githubusercontent.com/Arkapravo-Ghosh/img/main/smart-parking-system/smart-parking-system.jpg"></img>
</div>
</details>

# Software
<details>
    <summary>Linux Server</summary>

Install [MariaDB Server](https://mariadb.com/downloads) in the Server you would be using for hosting the Database.
> NOTE: The MariaDB Server should run at `0.0.0.0` and not `127.0.0.1`. Configure that in `bind-address` in the file `/etc/mysql/mariadb.conf.d/50-server.cnf`

Log in to the root shell of MariaDB Server using the following command:

`sudo mysql -u root`

or

`sudo mysql -u root -p`

Run the following SQL Queries to configure MariaDB as per our project:
### 1. Creating Users
#### Client User
This user will be accessed by the client with read-only permissions on a single table so it does not need to have a secure password. Instead, we would be using the password as configured in the client.

Run the following command:

```sql
CREATE USER 'client'@'%' IDENTIFIED BY 'guest';
```

#### Server User
This user will be accessed by the server with write permissions on a single table and it needs a secure password. We need to store the password in a file named `mysqlpasswd` in the same directory as the server's program file.
> NOTE: The server's program file is [this](src/server/main.py) if you are using an Arduino Uno and [this](src/alternate/main.py) if you are using a Raspberry Pi.
Assuming the password is `ExAmpl1d2h`, run the following command:

```sql
CREATE USER 'uicprojserver'@'%' IDENTIFIED BY 'ExAmpl1d2h';
```
> NOTE: Use a different and more secure password than the one mentioned here.

### 2. Creating the Database and the Table with proper properties

Run the following command to create the database:

```sql
CREATE DATABASE uic_project;
```

Run the following command to use the newly created database:

```sql
USE uic_project;
```

Run the following command to create the table:

```sql
CREATE TABLE main(id int primary key auto_increment, full int);
```

Run the following command to create two rows:

```sql
INSERT INTO main(id) VALUES(1, 2);
```

### 3. Configuring Proper Privileges for the newly created users

#### Client User

```sql
GRANT SELECT ON uic_project.main TO 'client'@'%';
```

#### Server User

```sql
GRANT ALL PRIVILEGES ON uic_project.* TO 'uicprojserver'@'%';
```

#### Refresh the Privileges

```sql
FLUSH PRIVILEGES;
```

</details>

<details>
    <summary>Client</summary>

The [client](src/client/main.py) is a simple Python script that uses `watch` command in Linux to refresh output from [this python program](src/client/prog.py), which will read the data from the database and display it in a CLI format.

`cd ./src/client`\
`./main.py`

</details>
