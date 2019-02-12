
import {CrossStorageHub} from 'cross-storage';

CrossStorageHub.init([
    {origin: new RegExp('.*'+process.env.STORAGE_DOMAIN+'$'), allow: ['get','set','del']},
    {origin: new RegExp('.+$'), allow: ['get']}
    ]);