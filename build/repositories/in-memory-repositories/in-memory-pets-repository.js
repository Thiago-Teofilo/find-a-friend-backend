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

// src/repositories/in-memory-repositories/in-memory-pets-repository.ts
var in_memory_pets_repository_exports = {};
__export(in_memory_pets_repository_exports, {
  default: () => InMemoryPetsRepository
});
module.exports = __toCommonJS(in_memory_pets_repository_exports);
var import_crypto = require("crypto");
var InMemoryPetsRepository = class {
  constructor() {
    this.items = [];
  }
  async register(data) {
    const pet = {
      _id: (0, import_crypto.randomUUID)(),
      name: data.name,
      organization_id: data.organization_id,
      age: data.age,
      energy_level: data.energy_level,
      size_level: data.size_level,
      level_of_independence: data.level_of_independence,
      area_size_level: data.area_size_level,
      type: data.type,
      description: data.description,
      requirementsForAdoption: data.requirementsForAdoption
    };
    this.items.push(pet);
    return pet;
  }
  async findByOrganizationWithFilters(organization_id, filters) {
    const pets = this.items.filter(
      (item) => item.organization_id === organization_id
    );
    let filteredPets = [...pets];
    if (filters.age) {
      filteredPets = filteredPets.filter((pet) => pet.age === filters.age);
    }
    if (filters.energy_level) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === filters.energy_level
      );
    }
    if (filters.size_level) {
      filteredPets = filteredPets.filter(
        (pet) => pet.size_level === filters.size_level
      );
    }
    if (filters.level_of_independence) {
      filteredPets = filteredPets.filter(
        (pet) => pet.level_of_independence === filters.level_of_independence
      );
    }
    return filteredPets;
  }
  async getPetDetails(pet_id) {
    const pet = this.items.find((item) => item._id === pet_id);
    return pet;
  }
};
