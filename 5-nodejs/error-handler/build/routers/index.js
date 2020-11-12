"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const ThemeA_1 = __importDefault(require("./ThemeA"));
const ThemeB_1 = __importDefault(require("./ThemeB"));
class AppRouter {
    constructor() {
        this._router = express_1.Router();
        this._subRouterA = ThemeA_1.default;
        this._subRouterB = ThemeB_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.use('/themea', this._subRouterA);
        this._router.use('/themeb', this._subRouterB);
    }
}
module.exports = new AppRouter().router;
