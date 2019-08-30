# uptime-mqtt

A simple bridge to transfer uptime of my home server to MQTT.
I'm using it to be able to check it at any time via MQTT Dash Android application.

# Usage

I use it as a cron job. Sample crontab file:

```
MQTT_URL=mqtt://<ip_or_host>

*/5 * * * * node /<path_to>/uptime-mqtt/index.js
```

# TODO

- allow more than one machine to be reported (hardcoded to one for now)
