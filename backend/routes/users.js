"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mock_users_json_1 = __importDefault(require("../mockdata/mock_users.json"));
var router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send(mock_users_json_1.default);
});
router.get("/username/:username", (req, res) => {
    let user = mock_users_json_1.default.users.find((user) => user.username === req.params.username);
    if (user) {
        res.status(200).send(mock_users_json_1.default.users.find((user) => user.username === req.params.username));
    }
    else {
        res.status(404).send("User not found");
    }
});
module.exports = router;
