import '../assets/ds.scss';

import { dom, library, config } from '@fortawesome/fontawesome-svg-core';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {parse_qs, DiscoveryService} from "@theidentityselector/thiss-ds/src/discovery";

config.autoReplaceSvg = 'nest';

library.add(faInfoCircle);
dom.watch();

let mdq = process.env.MDQ_URL;
let persistence = process.env.PERSISTENCE_URL;
let context = process.env.DEFAULT_CONTEXT;

let ds = new DiscoveryService(mdq, persistence, context);

let params = parse_qs(window.location.search.substr(1).split('&'));