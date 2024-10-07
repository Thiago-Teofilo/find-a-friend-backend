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

// src/use-cases/register-pet.ts
var register_pet_exports = {};
__export(register_pet_exports, {
  RegisterPetUseCase: () => RegisterPetUseCase
});
module.exports = __toCommonJS(register_pet_exports);
var RegisterPetUseCase = class {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }
  async execute({
    name,
    age,
    energy_level,
    size_level,
    level_of_independence,
    area_size_level,
    type,
    requirementsForAdoption,
    description,
    organization_id
  }) {
    const pet = await this.petsRepository.register({
      name,
      age,
      energy_level,
      size_level,
      level_of_independence,
      area_size_level,
      type,
      requirementsForAdoption,
      description,
      organization_id
    });
    return { pet };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterPetUseCase
});
