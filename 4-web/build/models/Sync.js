"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sync = void 0;
const axios_1 = __importDefault(require("axios"));
class Sync {
    constructor(rootUrl) {
        this.rootUrl = rootUrl;
    }
    fetch(id) {
        return axios_1.default.get(`${this.rootUrl}/${id}`);
    }
    save(data) {
        const { id } = data;
        axios_1.default.get(`${this.rootUrl}/${id}`).catch((err) => {
            if (err.response.status === 404) {
                //id not exist, create new user
                return axios_1.default.post(`${this.rootUrl}`, data);
            }
        });
        // id exist, update user
        return axios_1.default.put(`${this.rootUrl}/${id}`, data);
    }
}
exports.Sync = Sync;
