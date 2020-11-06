"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Eventing_1 = require("./Eventing");
const Sync_1 = require("./Sync");
const rootUrl = 'http://localhost:3000/users';
class User {
    constructor(data) {
        this.data = data;
        this.events = new Eventing_1.Eventing();
        this.sync = new Sync_1.Sync(rootUrl);
    }
    get(id) {
        console.log('data', this.data);
        return this.data[id];
    }
    set(update) {
        Object.assign(this.data, update);
    }
}
exports.User = User;
