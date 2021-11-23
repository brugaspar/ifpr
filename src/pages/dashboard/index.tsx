import Head from "next/head"
import { GetServerSideProps } from "next"

import { getAccessToken } from "../../helpers/token.helper"

import { Container } from "../../styles/dashboard.styles"

export default function Dashboard() {
  return (
    <Container>
      <Head>
        <title>Mark One | Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
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

  return {
    props: {},
  }
}
