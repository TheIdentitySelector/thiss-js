
import {CrossStorageHub} from 'cross-storage';

CrossStorageHub.init([
    {origin: /^<%= process.env.STORAGE_DOMAIN %>$/, allow: ['get','set','del']},
    {origin: /.+$/, allow: ['get']}
    ]);