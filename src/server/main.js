const rpio = require('rpio');
const fs = require('fs');

let pins = [];

// Read the config file and initialize the pins array
try {
  const data = fs.readFileSync('/etc/sps-pins.conf', 'utf8');
  const pinStrings = data.split('\n').filter(str => str.trim() !== ''); // Strip empty lines
  pins = pinStrings.map(str => parseInt(str, 10)); // Parse pin numbers as integers
} catch (err) {
  console.error(`Error reading /etc/sps-pins.conf: ${err}`);
}

function syncConfig() {
  // Read the config file and update the pins array
  try {
    const data = fs.readFileSync('/etc/sps-pins.conf', 'utf8');
    const pinStrings = data.split('\n').filter(str => str.trim() !== ''); // Strip empty lines
    const newPins = pinStrings.map(str => parseInt(str, 10)); // Parse pin numbers as integers

    // Remove keys for pins that are no longer in the config file
    pins = pins.filter(pin => newPins.includes(pin));

    // Add new pins to the array
    for (const pin of newPins) {
      if (!pins.includes(pin)) {
        pins.push(pin);
      }
    }

    // Sort the pins array in ascending order
    pins.sort((a, b) => a - b);

  } catch (err) {
    console.error(`Error reading /etc/sps-pins.conf: ${err}`);
  }
}

function main() {
  setInterval(syncConfig, 1000); // Sync config every 1 second

  // Set up input pins
  for (const pin of pins) {
    rpio.open(pin, rpio.INPUT);
  }

  while (true) {
    const data = {};
    let index = 1;
    for (const pin of pins) {
      data[index.toString()] = rpio.read(pin) === 0 ? 1 : 0;
      index++;
    }
    fs.writeFileSync('/tmp/sps-data.json', JSON.stringify(data));
    rpio.msleep(100);
  }
}

main();
