const os = require('os');
const MQTT = require('async-mqtt');
const log = require('home-logger')('uptime-mqtt');

const MQTT_URL = process.env.MQTT_URL;

if (!MQTT_URL) {
    log.error('Missing MQTT_URL environment variable');
    process.exit(1);
}

const client = MQTT.connect(MQTT_URL, { clientId: 'uptime' });

client.once('connect', async () => {
    const zeroPad = value => (value < 10) ? '0' + value : value.toString();

    const uptime = os.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor(uptime / (60 * 60)) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const text = `${days} days, ${zeroPad(hours)}:${zeroPad(minutes)}`;

    try {
        const options = { retain: true };

        await Promise.all([
            client.publish('home/uptime/total_seconds', uptime.toString(), options),
            client.publish('home/uptime/days', days.toString(), options),
            client.publish('home/uptime/hours', hours.toString(), options),
            client.publish('home/uptime/minutes', minutes.toString(), options),
            client.publish('home/uptime/text', text, options)
        ]);

        await client.end();

        if (minutes % 10 === 0) {
            log.info({ uptime: text }, 'Uptime - ' + text);
        }
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
});
