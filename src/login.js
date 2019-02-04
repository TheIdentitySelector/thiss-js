
import './assets/login.css';
import {DiscoveryComponent} from "./ds-component";
import {DiscoveryService} from "./ds-client";

require("./ds-client.js");
require('./ds-component.js');

export default {
  DiscoveryService: DiscoveryService,
  DiscoveryComponent: DiscoveryComponent
};
