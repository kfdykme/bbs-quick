"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BBSService = exports.LOGINTYPE = void 0;
const knict_fetch_1 = require("knict-fetch");
const KnictBBSContants_1 = require("./KnictBBSContants");
const { POST, PostData, OnUnsupport, PostType } = knict_fetch_1.HttpMethod;
var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["login"] = "login";
})(LOGINTYPE = exports.LOGINTYPE || (exports.LOGINTYPE = {}));
class KnictBBSService {
    login(type, username, password) {
        return OnUnsupport();
    }
    newReply(page, apphash, accessSecret, accessToken) {
        return OnUnsupport();
    }
    getTodayHot(page, apphash, accessSecret, accessToken) {
        return OnUnsupport();
    }
    newPost(page, apphash, accessSecret, accessToken, sortby = 'new') {
        return OnUnsupport();
    }
}
__decorate([
    POST(KnictBBSContants_1.http.urlLogin, PostType.urlencoded),
    __param(0, PostData('type')), __param(1, PostData('username')), __param(2, PostData('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], KnictBBSService.prototype, "login", null);
__decorate([
    POST(KnictBBSContants_1.http.urlNewReply),
    __param(0, PostData('page')), __param(1, PostData('apphash')), __param(2, PostData('accessSecret')), __param(3, PostData('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], KnictBBSService.prototype, "newReply", null);
__decorate([
    POST(KnictBBSContants_1.http.urlTodayHot),
    __param(0, PostData('page')), __param(1, PostData('apphash')), __param(2, PostData('accessSecret')), __param(3, PostData('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], KnictBBSService.prototype, "getTodayHot", null);
__decorate([
    POST(KnictBBSContants_1.http.urlNewPost),
    __param(0, PostData('page')), __param(1, PostData('apphash')), __param(2, PostData('accessSecret')), __param(3, PostData('accessToken')), __param(4, PostData('sortby')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], KnictBBSService.prototype, "newPost", null);
exports.default = KnictBBSService;
const BBSService = knict_fetch_1.Knict.builder(new knict_fetch_1.FetchClientBuilder().baseUrl(KnictBBSContants_1.http.baseUrl))
    .create(new KnictBBSService());
exports.BBSService = BBSService;
