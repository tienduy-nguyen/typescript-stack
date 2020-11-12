"use strict";
const express_1 = require("express");
const ThemeB_1 = require("../controllers/ThemeB");
class ThemeBRouter {
    constructor() {
        this._router = express_1.Router();
        this._controller = new ThemeB_1.ThemeBController();
        this._configure();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    _configure() {
        this._router.get('/', (req, res, next) => {
            res.status(200).json({ message: 'this._controller.defaultMethod' });
        });
    }
}
module.exports = new ThemeBRouter().router;
