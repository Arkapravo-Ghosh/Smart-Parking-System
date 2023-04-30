const rpio = require('rpio');
const fs = require('fs');

let pins = [];

try {
  const data = fs.readFileSync('/etc/sps-pins.conf', 'utf8');
  const pinStrings = data.split('\n').filter(str => str.trim() !== '');
  pins = pinStrings.map(str => parseInt(str, 10));
} catch (err) {
  console.error(`Error reading /etc/sps-pins.conf: ${err}`);
}

function main() {
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
