import mongoose from 'mongoose'

export const petSchema = new mongoose.Schema(
  {
    name: String,
    age: { type: String, enum: ['PUPPY', 'YOUNG', 'ADULT', 'MATURE'] },
    energy_level: Number,
    size_level: Number,
    level_of_independence: Number,
    area_size_level: Number,
    type: { type: String, enum: ['DOG', 'CAT'] },
    description: String,
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    requirementsForAdoption: [
      {
        text: String,
      },
    ],
  },
  { timestamps: true },
)

export interface IPet {
  _id?: string
  name: string
  organization_id: string
  age: 'PUPPY' | 'YOUNG' | 'ADULT' | 'MATURE'
  energy_level: number
  size_level: number
  level_of_independence: number
  area_size_level: number
  type: 'DOG' | 'CAT'
  description?: string
  requirementsForAdoption: {
    text: string
  }[]
}
