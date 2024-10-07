"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/register.ts
var register_exports = {};
__export(register_exports, {
  RegisterUseCase: () => RegisterUseCase
});
module.exports = __toCommonJS(register_exports);
var import_bcryptjs = require("bcryptjs");
var RegisterUseCase = class {
  constructor(organizationRepository) {
    this.organizationRepository = organizationRepository;
  }
  async execute({
    name,
    location,
    phone,
    description,
    password,
    email
  }) {
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    const organization = await this.organizationRepository.register({
      name,
      location: {
        type: "Point",
        coordinates: [location.coordinates[0], location.coordinates[1]]
      },
      phone,
      description,
      password_hash,
      email
    });
    return { organization };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUseCase
});
