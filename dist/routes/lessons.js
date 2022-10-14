"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./../util/client");
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const { TOKEN, SYMBOL, PIN } = process.env;
const router = express_1.default.Router();
router.get('/week', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const day = today.getDay();
    const monday = new Date();
    const friday = new Date();
    if (day === 0) {
        monday.setDate(today.getDate() + 1);
        friday.setDate(today.getDate() + 5);
    }
    else if (day === 6) {
        monday.setDate(today.getDate() + 2);
        friday.setDate(today.getDate() + 4);
    }
    else {
        monday.setDate(today.getDate() - day + 1);
        friday.setDate(today.getDate() - day + 5);
    }
    res.send(yield client_1.client.getLessons(monday, friday));
}));
router.get(['/day/:offset', '/day'], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = parseInt(req.params.offset || '0');
    if (isNaN(offset))
        return res.status(400).send({ error: 'Offset must be a number' });
    const today = new Date();
    today.setDate(today.getDate() + offset);
    res.send(yield client_1.client.getLessons(today, today));
}));
exports.default = router;
