/**
  * Generate a 32 byte random identifier.
  *
  * @returns {string} a random string
  */

function randID() {
     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

const baseUrl = process.env.BASE_URL;

/**
 * A DiscoveryComponent class representing the business logic of a SAML disocvery service.
 *
 */
class _DiscoveryComponent {

    /**
     * The constructor takes 1 parameter:
     *
     * @param {props} [object] properties for the DS
     */
    constructor(props) {
        this.props = props;
    }

    render(selector) {
        let frame = window.document.createElement('iframe');
        frame.style['height'] = '85px';
        frame.style['width'] = '350px';
        frame.id = "ps_"+randID();
        const elem = window.document.body.querySelector(selector);
        elem.appendChild(frame);
        const params = new URLSearchParams(this.props).toString();
        frame.src = `${baseUrl}cta-std/?${params}`;
        return frame;
    }
}

export function DiscoveryComponent (props) {
    return new _DiscoveryComponent(props);
}

DiscoveryComponent.render = function(props, selector) {
  return DiscoveryComponent(props).render(selector);
};
