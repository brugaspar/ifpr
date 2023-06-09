import styled from "styled-components"

export const Container = styled.div`
  overflow:hidden;
  > img {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    width:50%;
    z-index: -1;   
  }
`

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 7rem;
  padding: 0 2rem;

  .illustration {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 2.5rem;
      max-width: 20rem;
      line-height: 3rem;
      text-align: center;
    }

    img {
      width: 28rem;
      margin: 5% 0;
    }

    p {
      font-size: 1.5rem;
      max-width: 30rem;
      text-align: center;
      line-height: 2rem;
      color: var(--background);
    }
  }

  .sign-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 30rem;
      margin-bottom: 6rem;
    }

    .error {
      color: var(--red);
      font-size: 1.25rem;

      margin-bottom: 2rem;
      margin-top: -4rem;

      text-align: center;

      max-width: 30rem;
    }

    form {
      max-width: 30rem;
      color: var(--text-title);

      label {
        display: inline-block;
        margin-bottom: 0.25rem;
        font-size: 1.25rem;
      }

      div + label {
        margin-top: 1rem;
      }

      button[type="submit"] {
        width: 100%;
        height: 3rem;
        background: var(--green);
        border: 0;
        border-radius: 0.25rem;

        color: var(--background);
        font-size: 1.25rem;
        font-family: "Epilogue";

        margin-top: 4rem;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`
