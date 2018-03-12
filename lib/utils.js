'use strict';


const Ajv = require('ajv');
const ajv = new Ajv({
    allErrors: true
});
const util = require('util');
const get = require('simple-get');


get.concat[util.promisify.custom] = (url) => {
    return new Promise((resolve, reject) => {
        get.concat(url, (error, res, data) => {
            if (error) {
                return reject(error);
            }
            // TODO: handle res.statuscode here ?
            resolve(data.toString());
        });
    });
};


const validateConfig = (config) => {
    const validate = ajv.compile({
        properties: {
            username: {
                allowEmpty: false
            },
            password: {
                allowEmpty: false
            },
            domain: {
                allowEmpty: false
            }
        },
        required: ['username', 'password', 'domain']
    });
    validate(config);
    return validate.errors ? new Error(ajv.errorsText(validate.errors)) : null;
};



/**
 * Parse ASCII formated update urls
 * 
 * sample request: 
 * http://freedns.afraid.org/api/?action=getdyndns&sha=<username|password>
 *
 * sample response:
 * blah.mooo.com|10.10.10.1|http://freedns.afraid.org/dynamic/update.php?xxxx
 * bloh.mooo.com|85.73.73.102|http://freedns.afraid.org/dynamic/update.php?xxxx
 * bleh.mooo.com|94.65.142.5|http://freedns.afraid.org/dynamic/update.php?xxx
 * 
 * @param  {String} body The response from freedns API
 * @return {Array} The parsed data
 */
const parseUpdateUrls = (body) => {
    return body.split('\n').map((row) => {
        row = row.split('|');
        return {
            domain: row[0],
            ip: row[1],
            updateUrl: row[2]
        };
    });
};


module.exports = {
    validateConfig,
    parseUpdateUrls,
    get: util.promisify(get.concat)
};