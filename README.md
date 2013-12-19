node-rpi-monit
==============

Light nodejs raspberry pi monitor (cpu, mem, temp, network etc)

1) Install nodejs on the Raspberry using the [pre-compiled binairies](http://nodejs.org/download/)
2) Clone this repository and `npm install`
3) Install pm2 `npm i pm2 -g`
4) Run the app `pm2 start app.js`
5) you might want to add it to the update-rc.d `pm2 startup`

Open http://PI_IP:3000.

Enjoy !

Atm it's really basic and use [OS](http://nodejs.org/api/os.html), [node-disk-free](https://npmjs.org/package/node-diskfree)
