"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeAController = void 0;
const ErrorHandler_1 = require("../models/ErrorHandler");
class ThemeAController {
    defaultMethod() {
        throw new ErrorHandler_1.ErrorHandler(501, 'Not implemented method');
    }
}
exports.ThemeAController = ThemeAController;
