import Head from "next/head"
import { GetServerSideProps } from "next"

import { getAccessToken } from "../../helpers/token.helper"

import { Container } from "../../styles/support.styles"

export default function Support() {
  return (
    <Container>
      <Head>
        <title>Mark One | Suporte</title>
      </Head>
      <h1>Support</h1>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = getAccessToken(ctx)

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userHasPermission = true

  if (!userHasPermission) {
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
