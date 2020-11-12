"use strict";
const express_1 = require("express");
const ThemeA_1 = require("../controllers/ThemeA");
class ThemeARouter {
    constructor() {
        this._router = express_1.Router();
        this._controller = new ThemeA_1.ThemeAController();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.get('/', (req, res, next) => {
            try {
                const result = this._controller.defaultMethod;
                res.status(200).json(result);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
module.exports = new ThemeARouter().router;
