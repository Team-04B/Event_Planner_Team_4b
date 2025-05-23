"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./app/routers"));
const globalErrorHandler_1 = __importDefault(require("./app/middleWares/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: ['http://localhost:3000', 'https://eventplannerfrontend.vercel.app'], credentials: true }));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send({
        message: 'Event Planner server is Running',
    });
});
app.use('/api', routers_1.default);
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API NOT FOUND',
        error: {
            path: req.originalUrl,
            message: 'Your Requested Path Is Not Found',
        },
    });
});
exports.default = app;
