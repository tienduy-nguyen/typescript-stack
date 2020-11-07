"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('Meoooo!');
});
app.listen(3000, () => {
    console.log('App running on port 3000!');
});
