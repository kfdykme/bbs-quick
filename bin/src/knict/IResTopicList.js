"use strict";
// To parse this data:
//
//   import { Convert, IResTopicList } from "./file";
//
//   const iResTopicList = Convert.toIResTopicList(json);
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
// Converts JSON strings to/from your types
class Convert {
    static toIResTopicList(json) {
        return JSON.parse(json);
    }
    static iResTopicListToJson(value) {
        return JSON.stringify(value);
    }
}
exports.Convert = Convert;
