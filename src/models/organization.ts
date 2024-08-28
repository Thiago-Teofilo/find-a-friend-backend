import mongoose from 'mongoose'
import { IPet } from './pet'

export const organizationSchema = new mongoose.Schema(
  {
    name: String,
    location: {
      type: {
        type: String,
        enum: ['Point'], // Apenas permita o tipo 'Point'
        default: 'Point', // Defina o tipo padrão como 'Point'
      },
      coordinates: {
        type: [Number], // Array de números para armazenar latitude e longitude
        index: '2dsphere', // Cria um índice geoespacial para consultas rápidas
      },
    },
    phone: String,
    description: String,
    password_hash: String,
    email: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  },
  { timestamps: true },
)

export interface IOrganization {
  _id?: string
  name: string
  location: {
    type: string
    coordinates: number[]
  }
  phone: string
  description?: string
  password_hash: string
  email: string
  pets?: IPet[]
}
