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
	const days = Math.floor(uptime / (60 * 60 * 24));
	const hours = Math.floor(uptime / (60 * 60)) % 24;
	const minutes = Math.floor(uptime / 60) % (60 * 24);
	const zeroPad = value => (value < 10) ? '0' + value : value.toString();

	try {
		await Promise.all([
			client.publish('home/uptime/total_seconds', uptime.toString()),
			client.publish('home/uptime/days', days.toString()),
			client.publish('home/uptime/hours', hours.toString()),
			client.publish('home/uptime/minutes', minutes.toString()),
			client.publish('home/uptime/text', `${days} days, ${zeroPad(hours)}:${zeroPad(minutes)}`)
		]);

		await client.end();

		log.info('Finished');
	} catch (error) {
		log.error(error.message);
		process.exit();
	}
});
