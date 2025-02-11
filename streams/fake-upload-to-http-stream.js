import { Readable } from 'stream';
import fetch from 'node-fetch';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());

        this.push(buf);
      }
    }, 1000);
  }
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToHundredStream(),
}).then(response => {
  return response.text();
}).then(data => {
  console.log(data);
})