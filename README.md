# freedns-api

[![Dependency Status](https://david-dm.org/j-Chaniotis/freedns-api.svg)](https://david-dm.org/j-Chaniotis/freedns-api)
[![npm version](https://badge.fury.io/js/freedns-api.svg)](https://badge.fury.io/js/freedns-api)

A node.js wrapper around freedns.afraid.org API

## Installation

`npm install freedns-api`

## Usage

```javascript
'use strict';
const freednsApi = require('freedns-api');
(async () => {
    /**
     *  Wrap everything inside a try-catch block.
     *  if there is invalid configuration or network problems an error will be thrown
     */
    try {

        // Get a list of all account dns records
        const entries = await freednsApi.getdyndns({
            username: 'BruceWayne',
            password: 'B@tM@n'
        });

        // Update the first record with a user provided ip address
        const status = await freednsApi.update({
            updateUrl: entries[0].updateUrl, // This value can be obtained directly from the website
            address: '10.10.21.11' // This is optional, if not used, the ip will be detected automatically
        });

        console.log(status);

    } catch (error) {
        console.error(error);
    }
    
})();

```

## License

[MIT](https://github.com/J-Chaniotis/freedns-api/blob/master/LICENSE)