import { PrismaClient } from ".prisma/client"

import tablesRepository from "./tables.repository"

type Action = "insert" | "update" | "disable" | "sign_in_error" | "delete"

type Log = {
  description: string
  action: Action
  referenceId: string
  userId?: string
}

const prisma = new PrismaClient()

class LogsRepository {
  async store(tableName: string, log: Log) {
    const table = await tablesRepository.findByName(tableName)

    if (!table) {
      throw new Error(`Tabela inexistente: ${tableName}`)
    }

    await prisma.logs.create({
      data: {
        ...log,
        tableId: table.id,
      },
    })
  }

  async findAll() {
    const logs = await prisma.logs.findMany({
      include: {
        table: true,
        user: true,
      },
    })

    return logs
  }
}

export default new LogsRepository()
