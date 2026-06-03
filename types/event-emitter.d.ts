declare module "event-emitter" {
	type EventEmitterTarget = object;

	type EventEmitter = {
		(target?: EventEmitterTarget): EventEmitterTarget;
	};

	const EventEmitter: EventEmitter;

	export default EventEmitter;
}
