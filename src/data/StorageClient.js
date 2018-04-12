const Promise = require('bluebird');

/**
 * A simple wrapper around chrome.storage api's. Helps with Promisify-ing things.
 */

class StorageClient {

    saveItem(key, value) {
        let data = {};
        data[key] = value;
        return this.save(data);
    }

    getItem(key, defaultValue = "") {
        let data = {};
        data[key] = defaultValue;
        return this.get(data);
    }

    getItems(keys, defaultValues = [""]) {
        let data = this.generateDataObj(keys, defaultValues);
        return this.get(data);
    }

    save(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(data, resolve);
        });
    }

    get(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(data, resolve);
        });
    }

    generateDataObj(keys, values) {
        let result = {};
        keys.forEach((key, i) => {
            let value = values[i%values.length];
            result[key] = value;
        });
        return result;
    }
}

module.exports = new StorageClient;