const os = require('os');
const MQTT = require('async-mqtt');
const log = require('fancy-log');

const MQTT_URL = process.env.MQTT_URL;

if (!MQTT_URL) {
	log.error('Missing MQTT_URL environment variable');
	process.exit(1);
}

const client = MQTT.connect(MQTT_URL);

client.once('connect', async () => {
	log.info('Connected to ' + MQTT_URL);
	const uptime = os.uptime();

	try {
		await client.publish('home/uptime/seconds', uptime.toString());
		await client.end();

		log.info('Finished');
	} catch (error) {
		log.error(error.message);
		process.exit();
	}
});