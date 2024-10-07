"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/organization.ts
var organization_exports = {};
__export(organization_exports, {
  organizationSchema: () => organizationSchema
});
module.exports = __toCommonJS(organization_exports);
var import_mongoose = __toESM(require("mongoose"));
var organizationSchema = new import_mongoose.default.Schema(
  {
    name: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        // Apenas permita o tipo 'Point'
        default: "Point"
        // Defina o tipo padrão como 'Point'
      },
      coordinates: {
        type: [Number],
        // Array de números para armazenar latitude e longitude
        index: "2dsphere"
        // Cria um índice geoespacial para consultas rápidas
      }
    },
    phone: String,
    description: String,
    password_hash: String,
    email: String,
    pets: [{ type: import_mongoose.default.Schema.Types.ObjectId, ref: "Pet" }]
  },
  { timestamps: true }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationSchema
});
