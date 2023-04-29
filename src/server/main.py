#!/bin/python3
import serial
import time
import mariadb as connector

# Serial port configuration
serial_port = "/dev/ttyUSB0"
baud_rate = 9600
ser = serial.Serial(serial_port, baud_rate)

# MariaDB configuration
sqlhost = "localhost"
sqluser = "uicprojserver"
with open("mysqlpasswd", "r") as passfile:
    sqlpasswd = passfile.read()
cnx = connector.connect(
    user=sqluser,
    passwd=sqlpasswd,
    host=sqlhost,
    autocommit=True,
    database="uic_project",
)


def execute(arg):
    cursor = cnx.cursor()
    cursor.execute(arg)
    cursor.close()


def main():
    while True:
        line = ser.readline()
        line = line.decode("utf-8")
        dat = line.split(" ")
        x = len(dat)
        cnt = 0
        while cnt < x - 1:
            y = dat[cnt]
            query = f"UPDATE main SET full = {y} WHERE id = {cnt + 1}"
            execute(query)
            cnt += 1
        time.sleep(0.1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        cnx.close()
        ser.close()
        print("\nExited.")
        exit(0)
