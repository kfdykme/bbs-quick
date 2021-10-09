"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knictCliService = exports.KnictCliService = void 0;
const Cli = __importStar(require("knict-cli"));
const KnictBBSContants_1 = require("./KnictBBSContants");
class KnictCliService {
    login(username, password) {
        return {
            username: '',
            password: ''
        };
    }
    homeTag(...args) {
        return args;
    }
    bottomTag(...args) {
        return args;
    }
    afterHomeTag() {
        return arguments;
    }
}
__decorate([
    Cli.CliMethod.Input(),
    __param(0, Cli.CliMethod.Str('username')), __param(1, Cli.CliMethod.Password('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], KnictCliService.prototype, "login", null);
__decorate([
    Cli.CliMethod.Choice(KnictBBSContants_1.CLIV.msgHome, [KnictBBSContants_1.CLIV.choiceHomeReply, KnictBBSContants_1.CLIV.choiceHomePost, KnictBBSContants_1.CLIV.choiceHomeHot]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], KnictCliService.prototype, "homeTag", null);
__decorate([
    Cli.CliMethod.Choice('Choose your next tag', ["Home", "Message", "Board", "Profile"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], KnictCliService.prototype, "bottomTag", null);
__decorate([
    Cli.CliMethod.Choice(KnictBBSContants_1.CLIV.msgAfterHome, [KnictBBSContants_1.CLIV.choiceAfterHomeBack, KnictBBSContants_1.CLIV.choiceAfterHomeNext, KnictBBSContants_1.CLIV.choiceAfterHomePre]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], KnictCliService.prototype, "afterHomeTag", null);
exports.KnictCliService = KnictCliService;
const knictCliService = Cli.Knict.builder(new Cli.CliClientBuilder())
    .create(new KnictCliService());
exports.knictCliService = knictCliService;
