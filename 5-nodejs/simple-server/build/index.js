"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const router_1 = require("./routes/router");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['key1', 'key2'],
}));
app.use(router_1.router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
