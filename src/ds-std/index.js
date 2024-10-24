/**
  * Generate a 32 byte random identifier.
  *
  * @returns {string} a random string
  */

function randID() {
     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}


/**
 * A DiscoveryService class representing the business logic of a SAML disocvery service.
 *
 */
class _StdDiscoveryComponent {

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
        //frame.src = url;
        const params = new URLSearchParams(this.props).toString();
        frame.src = `https://test.sa.net/cta-std/?${params}`;
        return frame;
    }
}

export function StdDiscoveryComponent (props) {
    return new _StdDiscoveryComponent(props);
}
