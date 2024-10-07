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

// src/use-cases/fetch-nearby-pets-with-filters.ts
var fetch_nearby_pets_with_filters_exports = {};
__export(fetch_nearby_pets_with_filters_exports, {
  FetchNearbyPetsWithFiltersUseCase: () => FetchNearbyPetsWithFiltersUseCase
});
module.exports = __toCommonJS(fetch_nearby_pets_with_filters_exports);
var FetchNearbyPetsWithFiltersUseCase = class {
  constructor(organizationsRepository, petsRepository) {
    this.organizationsRepository = organizationsRepository;
    this.petsRepository = petsRepository;
  }
  async execute({
    latitude,
    longitude,
    filters
  }) {
    const pets = [];
    const nearbyOrganizations = await this.organizationsRepository.findNearby(
      latitude,
      longitude
    );
    for (const organization of nearbyOrganizations) {
      if (organization._id) {
        const results = await this.petsRepository.findByOrganizationWithFilters(
          organization._id,
          filters
        );
        pets.push(...results);
      }
    }
    return { pets };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchNearbyPetsWithFiltersUseCase
});
