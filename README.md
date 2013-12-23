node-rpi-monit
==============

Light nodejs raspberry pi monitor (cpu, mem, temp, network etc)

1. Install nodejs on the Raspberry using the [pre-compiled binairies](http://nodejs.org/download/) and redis
3. Start redis using your own conf file or the one in this repo (just daemonized the process)
2. Clone this repository and `npm install`
3. Install pm2 `npm i pm2 -g`
4. Run the app `pm2 start app.js`
5. you might want to add it to the update-rc.d `pm2 startup`

## Dashboard
![Node Rpi Monitoring dashboard](http://www.zupmage.eu/i/daM4fWXchN.png)

## Configuration



Open http://PI_IP:3000.

Enjoy !