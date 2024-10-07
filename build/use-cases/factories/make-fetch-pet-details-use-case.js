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

// src/use-cases/factories/make-fetch-pet-details-use-case.ts
var make_fetch_pet_details_use_case_exports = {};
__export(make_fetch_pet_details_use_case_exports, {
  makeFetchPetDetailsUseCase: () => makeFetchPetDetailsUseCase
});
module.exports = __toCommonJS(make_fetch_pet_details_use_case_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333),
  JWT_SECRET: import_zod.z.string(),
  DATABASE_URL: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/models/organization.ts
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

// src/models/pet.ts
var import_mongoose2 = __toESM(require("mongoose"));
var petSchema = new import_mongoose2.default.Schema(
  {
    name: String,
    age: { type: String, enum: ["PUPPY", "YOUNG", "ADULT", "MATURE"] },
    energy_level: Number,
    size_level: Number,
    level_of_independence: Number,
    area_size_level: Number,
    type: { type: String, enum: ["DOG", "CAT"] },
    description: String,
    organization_id: {
      type: import_mongoose2.default.Schema.Types.ObjectId,
      ref: "Organization"
    },
    requirementsForAdoption: [
      {
        text: String
      }
    ]
  },
  { timestamps: true }
);

// src/database/index.ts
var import_mongoose3 = __toESM(require("mongoose"));
var Organization = import_mongoose3.default.model(
  "Organization",
  organizationSchema
);
var Pet = import_mongoose3.default.model("Pet", petSchema);

// src/repositories/mongoose/mongoose_pets_repository.ts
var MongoosePetsRepository = class {
  async register(data) {
    const pet = new Pet(data);
    pet.save();
    return pet;
  }
  async findByOrganizationWithFilters(organization_id, filters) {
    const pets = await Pet.find({
      organization_id
    });
    let filteredPets = [...pets];
    if (filters.age !== void 0) {
      filteredPets = filteredPets.filter((pet) => pet.age === filters.age);
    }
    if (filters.energy_level !== void 0) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === filters.energy_level
      );
    }
    if (filters.size_level !== void 0) {
      filteredPets = filteredPets.filter(
        (pet) => pet.size_level === filters.size_level
      );
    }
    if (filters.level_of_independence !== void 0) {
      filteredPets = filteredPets.filter(
        (pet) => pet.level_of_independence === filters.level_of_independence
      );
    }
    return filteredPets;
  }
  async getPetDetails(pet_id) {
    const pet = await Pet.findById(pet_id);
    return pet;
  }
};

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found error.");
  }
};

// src/use-cases/fetch-pet-details.ts
var FetchPetDetailsUseCase = class {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }
  async execute({
    pet_id
  }) {
    const pet = await this.petsRepository.getPetDetails(pet_id);
    if (!pet) {
      throw new ResourceNotFoundError();
    }
    return { pet };
  }
};

// src/use-cases/factories/make-fetch-pet-details-use-case.ts
function makeFetchPetDetailsUseCase() {
  const petsRepository = new MongoosePetsRepository();
  const fetchPetDetailsUseCase = new FetchPetDetailsUseCase(petsRepository);
  return fetchPetDetailsUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeFetchPetDetailsUseCase
});
