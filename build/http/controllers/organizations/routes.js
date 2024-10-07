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

// src/http/controllers/organizations/routes.ts
var routes_exports = {};
__export(routes_exports, {
  organizationsRoutes: () => organizationsRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/use-cases/errors/organization-already-exists-error.ts
var OrganizationAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail already exists.");
  }
};

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

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/repositories/mongoose/mongoose-organizations-repository.ts
var MongooseOrganizationsRepository = class {
  async register(data) {
    const otherOrganizationsWithSameEmail = await Organization.find({
      email: data.email
    });
    if (otherOrganizationsWithSameEmail.length > 0) {
      throw new OrganizationAlreadyExistsError();
    }
    const organization = new Organization(data);
    organization.save();
    return organization;
  }
  async findByEmail(email) {
    const organization = await Organization.findOne({
      email
    });
    if (!organization) {
      throw new InvalidCredentialsError();
    }
    return organization;
  }
  async findNearby(longitude, latitude) {
    const radiusKm = 50;
    const organizations = await Organization.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusKm
        }
      }
    });
    return organizations;
  }
};

// src/use-cases/register.ts
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

// src/use-cases/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const organizationRepository = new MongooseOrganizationsRepository();
  const registerUseCase = new RegisterUseCase(organizationRepository);
  return registerUseCase;
}

// src/http/controllers/organizations/register.ts
var import_zod2 = require("zod");
async function register(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    name: import_zod2.z.string(),
    latitude: import_zod2.z.coerce.number(),
    longitude: import_zod2.z.coerce.number(),
    phone: import_zod2.z.string(),
    description: import_zod2.z.string(),
    password: import_zod2.z.string(),
    email: import_zod2.z.string().email()
  });
  const { name, longitude, latitude, phone, description, email, password } = registerBodySchema.parse(request.body);
  try {
    const registerUseCase = makeRegisterUseCase();
    const organization = await registerUseCase.execute({
      name,
      location: {
        coordinates: [longitude, latitude]
      },
      phone,
      description,
      email,
      password
    });
    return reply.status(201).send(organization);
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}

// src/use-cases/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(organizationRepository) {
    this.organizationRepository = organizationRepository;
  }
  async execute({
    email,
    password
  }) {
    const organization = await this.organizationRepository.findByEmail(email);
    const doesPasswordMatches = await (0, import_bcryptjs2.compare)(
      password,
      organization.password_hash
    );
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return { organization };
  }
};

// src/use-cases/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const organizationRepository = new MongooseOrganizationsRepository();
  const authenticateUseCase = new AuthenticateUseCase(organizationRepository);
  return authenticateUseCase;
}

// src/http/controllers/organizations/authenticate.ts
var import_zod3 = require("zod");
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod3.z.object({
    password: import_zod3.z.string(),
    email: import_zod3.z.string().email()
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { organization } = await authenticateUseCase.execute({
      email,
      password
    });
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization._id?.toString()
        }
      }
    );
    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}

// src/http/controllers/organizations/routes.ts
async function organizationsRoutes(app) {
  app.post("/organizations", register);
  app.post("/sessions", authenticate);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationsRoutes
});
