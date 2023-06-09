import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRef, useState, FormEvent } from "react"
import { toast } from "react-toastify"

import { Input } from "../components/Input"
import { Checkbox } from "../components/Checkbox"

import { getAccessToken } from "../helpers/token.helper"
import { useAuth } from "../hooks/useAuth"

import { Container, Content } from "../styles/home.styles"

export default function Home() {
  const { signIn } = useAuth()

  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleToggleCheckbox() {
    setCheckbox(!checkbox)
  }

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    const id = toast.loading("Carregando", {
      theme: "dark",
      style: {
        background: "var(--green)",
      },
    })

    try {
      await signIn({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        keepConnected: checkbox,
      })

      setLoading(false)

      toast.dismiss(id)
      toast.dismiss("error")
    } catch (error: any) {
      setLoading(false)
      toast.dismiss(id)

      usernameRef.current.focus()

      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          for (const message of error.response.data.message) {
            toast.error(message, { toastId: "error" })
          }
        } else {
          toast.error(error.response.data.message, { toastId: "error" })
        }
      } else {
        toast.error("Problemas internos", { toastId: "error" })
      }
    }
  }

  return (
    <Container>
      <Head>
        <title>Mark One | Autenticação</title>
      </Head>

      <img src="/images/wave.png" alt="Onda" />

      <Content>
        <div className="illustration">
          <h1>Gerencie seus membros de forma fácil</h1>

          <img src="/images/illustration.png" alt="Trabalho em equipe" />

          <p>O melhor para seus membros, ganhando praticidade e controle no seu negócio</p>
        </div>

        <div className="sign-in">
          <img src="/images/logo_com_slogan.png" alt="Mark One" />

          <form onSubmit={handleSignIn}>
            <label htmlFor="username">Usuário</label>
            <Input
              light
              hasIcon
              id="username"
              type="text"
              autoFocus
              inputType="username"
              placeholder="Informe seu usuário"
              inputRef={usernameRef}
              disabled={loading}
            />

            <label htmlFor="password">Senha</label>
            <Input
              light
              hasIcon
              id="password"
              type="password"
              inputType="password"
              placeholder="Informe sua senha"
              inputRef={passwordRef}
              disabled={loading}
            />

            <Checkbox title="Manter conectado" active={checkbox} handleToggleActive={handleToggleCheckbox} />

            <button disabled={loading} type="submit">
              Entrar
            </button>
          </form>
        </div>
      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = getAccessToken(ctx)

  if (accessToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
