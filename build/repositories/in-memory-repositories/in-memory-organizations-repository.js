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

// src/repositories/in-memory-repositories/in-memory-organizations-repository.ts
var in_memory_organizations_repository_exports = {};
__export(in_memory_organizations_repository_exports, {
  default: () => InMemoryOrganizationsRepository
});
module.exports = __toCommonJS(in_memory_organizations_repository_exports);

// src/use-cases/errors/organization-already-exists-error.ts
var OrganizationAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail already exists.");
  }
};

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/repositories/in-memory-repositories/in-memory-organizations-repository.ts
var import_crypto = require("crypto");

// src/utils/repositories/in-memory-repository/calculate-distance.ts
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const \u03C61 = lat1 * Math.PI / 180;
  const \u03C62 = lat2 * Math.PI / 180;
  const \u0394\u03C6 = (lat2 - lat1) * Math.PI / 180;
  const \u0394\u03BB = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(\u0394\u03C6 / 2) * Math.sin(\u0394\u03C6 / 2) + Math.cos(\u03C61) * Math.cos(\u03C62) * Math.sin(\u0394\u03BB / 2) * Math.sin(\u0394\u03BB / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c / 1e3;
}

// src/repositories/in-memory-repositories/in-memory-organizations-repository.ts
var InMemoryOrganizationsRepository = class {
  constructor() {
    this.items = [];
  }
  async register(data) {
    const organization = {
      _id: (0, import_crypto.randomUUID)(),
      name: data.name,
      location: {
        type: "Point",
        coordinates: [
          data.location.coordinates[0],
          // Longitude
          data.location.coordinates[1]
          // Latitude
        ]
      },
      phone: data.phone,
      description: data.description,
      password_hash: data.password_hash,
      email: data.email,
      pets: []
    };
    if (this.items.find((item) => item.email === organization.email)) {
      throw new OrganizationAlreadyExistsError();
    }
    this.items.push(organization);
    return organization;
  }
  async findByEmail(email) {
    const organization = this.items.find((item) => item.email === email);
    if (!organization) {
      throw new InvalidCredentialsError();
    }
    return organization;
  }
  async findNearby(latitude, longitude) {
    const radius = 50;
    const organizationsNearby = this.items.filter((item) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        item.location.coordinates[1],
        item.location.coordinates[0]
      );
      return distance <= radius;
    });
    return organizationsNearby;
  }
};
