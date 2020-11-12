"use strict";
const ErrorHandler_1 = require("../models/ErrorHandler");
class ThemeAController {
    defaultMethod() {
        throw new ErrorHandler_1.ErrorHandler(501, 'Not implemented method');
    }
}
module.exports = new ThemeAController();
