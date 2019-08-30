# uptime-mqtt

A simple bridge to transfer uptime of my home server to MQTT.
I'm using it to be able to check it at any time via MQTT Dash Android application.

The script will publish the following topics:
```
home/uptime/total_seconds
home/uptime/days [eg. 123]
home/uptime/hours [eg. 14]
home/uptime/minutes [eg. 30]
home/uptime/text [eg. 123 days, 14:30]
```

# Usage

I use it as a cron job. Sample crontab file:

```
MQTT_URL=mqtt://<ip_or_host>

*/5 * * * * node /<path_to>/uptime-mqtt/index.js
```

# TODO

- allow more than one machine to be reported (hardcoded to one for now)
