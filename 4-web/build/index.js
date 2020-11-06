"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const user = new User_1.User({
    id: '1',
});
user.events.on('change', () => {
    console.log('change!');
});
user.events.trigger('change');
