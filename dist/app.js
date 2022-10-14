"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("./util/client");
const lessons_1 = __importDefault(require("./routes/lessons"));
require('dotenv').config();
const { TOKEN, SYMBOL, PIN } = process.env;
if (!TOKEN || !SYMBOL || !PIN) {
    throw new Error('Missing environment variables');
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, client_1.initClient)();
app.use('/lessons', lessons_1.default);
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
