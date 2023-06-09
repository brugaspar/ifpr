import styled from "styled-components"
import { darken, transparentize } from "polished"

export const Container = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 20rem;

  background: var(--shape-dark);

  transition: all 0.5s ease;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 7rem;

    img.small-icon {
      width: 3.2rem;
      opacity: 0;
      pointer-events: none;
      display: none;
    }

    img.icon {
      width: 15rem;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: calc(100% - 7rem);

    padding: 2rem 0;

    .list-container {
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      margin-bottom: 2rem;

      &::-webkit-scrollbar {
        width: 0.2rem;
      }

      &::-webkit-scrollbar-track {
        background: var(--background);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 2rem;
        border: 3px solid var(--text-body);
      }

      ul {
        padding: 0.5rem 0rem;

        .list-button {
          display: flex;
          align-items: center;
          height: 3rem;
          border: 1px solid var(--shape-dark);
          border-radius: 0.25rem;
          color: var(--text-body);
          width: 100%;

          list-style: none;
          background: var(--background);

          transition: background 0.2s;

          + .list-button {
            margin-top: 0.1rem;
          }

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 0.7rem;
            font-size: 1.5rem;
            margin-left: 1rem;

            &.submenu {
              padding: 0 0.3rem;
              font-size: 1.2rem;
              margin-left: 3rem;
            }
          }

          .label {
            font-size: 1.25rem;
            margin-top: 0.2rem;
            margin-left: 1rem;
            white-space: nowrap;
          }

          .has-submenu {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            padding-right: 1rem;

            .label-icon {
              transition: transform 0.5s ease-in-out;
            }

            &.open {
              .label-icon {
                transform: rotate(180deg);
              }
            }
          }

          &.subitem {
            background: ${darken(0.03, "#232323")};

            &.hide {
              display: none;
              opacity: 0;
              pointer-events: none;
            }

            &:hover {
              background: ${darken(0.01, "#121214")};
            }
          }

          &:hover {
            background: ${darken(0.05, "#121214")};
          }
        }
      }
    }

    .sign-out-container {
      width: 100%;

      ul {
        padding: 0 1rem;
        display: flex;
        align-items: center;

        .user-info {
          height: 3rem;
        }

        .name,
        .username {
          font-size: 1.2rem;
          margin-top: 0.2rem;
          margin-left: 1rem;
          white-space: nowrap;
        }

        .username {
          font-size: 1rem;
        }

        .list-button {
          display: flex;
          align-items: center;
          height: 3rem;

          list-style: none;
          background: rgba(255, 64, 64, 0.05);
          border-radius: 0.25rem;

          transition: background 0.2s;

          cursor: pointer;

          border: 1px solid ${transparentize(0.7, "#ff4040")};

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 0.7rem;
            font-size: 1.5rem;
            color: var(--red);
          }

          &:hover {
            background: ${transparentize(0.8, "#ff4040")};
          }
        }
      }
    }
  }

  &.close {
    width: 5rem;

    .logo-container {
      img.small-icon {
        opacity: 1;
        pointer-events: auto;
        display: inline;
      }

      img.icon {
        opacity: 0;
        pointer-events: none;
        display: none;
      }
    }

    .list-container,
    .sign-out-container {
      ul {
        .name,
        .username {
          display: none;
          opacity: 0;
          pointer-events: none;
        }

        .list-button {
          .label {
            display: none;
            opacity: 0;
            pointer-events: none;
          }

          .has-submenu {
            .label-icon {
              display: none;
              opacity: 0;
              pointer-events: none;
            }
          }

          &.subitem {
            display: none;
            opacity: 0;
            pointer-events: none;
          }
        }
      }
    }
  }
`
