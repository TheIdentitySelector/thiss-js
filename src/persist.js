const postRobot = require("post-robot");

export class PersistenceService {

    constructor(url, opts) {
        this._url = url;
        this._frame = this.create_iframe(url);
        this.dst = this._frame.contentWindow || this._frame;
    }

    create_iframe(url) {
        let frame = window.document.createElement('iframe');
        frame.style['display'] = 'none';
        frame.style['position'] = 'absolute';
        frame.style['top'] = '-999px';
        frame.style['left'] = '-999px';
        window.document.body.appendChild(frame);
        frame.src = url;
        return frame;
    }

    update(context, entity) {
        return postRobot.send(this.dst, 'update', {"context": context, "entity": entity});
    }

    entities(context) {
        return postRobot.send(this.dst, 'entities', {"context": context});
    }

    remove(context, entity_id) {
        return postRobot.send(this.dst, 'remove', {"context": context, "entity_id": entity_id});
    }

    entity(context, entity_id) {
        return postRobot.send(this.dst, 'entity', {"context": context, "entity_id": entity_id});
    }

}