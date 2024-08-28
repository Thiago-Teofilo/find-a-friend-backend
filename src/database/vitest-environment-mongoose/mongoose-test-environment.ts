import mongoose from 'mongoose'
import { Environment } from 'vitest'
import { Organization, Pet } from '..'

export default <Environment>(<unknown>{
  name: 'mongoose',
  async setup() {
    process.env.NODE_ENV = 'test'

    return {
      async teardown() {
        try {
          // Deletar documentos criados nos testes
          const resultPets = await Pet.deleteMany({})
          const resultOrganizations = await Organization.deleteMany({})

          console.log(
            `${resultPets.deletedCount} documentos de 'pets' deletados.`,
          )
          console.log(
            `${resultOrganizations.deletedCount} documentos de 'organizations' deletados.`,
          )
        } catch (error) {
          console.error('Erro ao deletar documentos:', error)
        } finally {
          // Fechar a conexão com o MongoDB após a operação
          mongoose.connection.close()
        }
      },
    }
  },
})
