import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { comparePassword } from "../helpers/hash.helper"
import { generateToken } from "../helpers/token.helper"

import usersRepository from "../repositories/users.repository"
import logsRepository from "../repositories/logs.repository"

type RequestAuthentication = {
  username: string
  password: string
}

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const { username, password }: RequestAuthentication = request.body

    const schema = {
      username: yup.string().required("Nome de usuário é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
    }

    await checkBodySchema(schema, request.body)

    const user = await usersRepository.findByUsername(username)

    if (!user) {
      throw new AppError("Usuário ou senha incorretos")
    }

    const matchPasswords = await comparePassword(password, user.password)

    if (!matchPasswords) {
      await logsRepository.store("users", {
        action: "sign_in_error",
        description: "Dados incorretos na autenticação do usuário",
        referenceId: user.id,
        userId: user.id,
      })

      throw new AppError("Usuário ou senha incorretos")
    }

    const token = generateToken({ id: user.id })

    const parsedUser = {
      ...user,
      password: undefined,
    }

    return response.status(200).json({ user: parsedUser, token })
  }
}

export default new AuthenticationController()
