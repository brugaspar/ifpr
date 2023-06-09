import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  FaArchive,
  FaChartPie,
  FaCog,
  FaFolderOpen,
  FaGripHorizontal,
  FaHome,
  FaServer,
  FaSignOutAlt,
  FaTag,
  FaToolbox,
  FaUser,
  FaUsers,
} from "react-icons/fa"

import { verifyUserPermissions } from "../../helpers/permissions.helper"
import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

type SidebarProps = {
  isOpen: boolean
  toggleSidebar: () => void
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const userPermissions = user?.permissions || []

  const [listActivitiesPermission, setListActivitiesPermission] = useState(false)
  const [listMembersPermission, setListMembersPermission] = useState(false)
  const [listPlansPermission, setListPlansPermission] = useState(false)
  const [listUsersPermission, setListUsersPermission] = useState(false)
  const [listLogsPermission, setListLogssPermission] = useState(false)
  const [listProductsPermission, setListProductsPermission] = useState(false)
  const [listBrandsPermission, setListBrandsPermission] = useState(false)
  const [listGroupsPermission, setListGroupsPermission] = useState(false)

  const [hideClass, setHideClass] = useState(true)
  const [hideClassProduct, setHideClassProduct] = useState(true)

  function handleToggleHideClass() {
    if (!hideClass && !isOpen) {
      toggleSidebar()
    } else {
      setHideClass(!hideClass)
    }

    if (!isOpen) {
      toggleSidebar()
    }
  }

  function handleToggleHideClassProduct() {
    if (!hideClassProduct && !isOpen) {
      toggleSidebar()
    } else {
      setHideClassProduct(!hideClassProduct)
    }

    if (!isOpen) {
      toggleSidebar()
    }
  }

  function handleSignOut() {
    if (isOpen) {
      toggleSidebar()
    }

    signOut()
  }

  function handleNavigateToPage(pageName: string) {
    if (isOpen) {
      toggleSidebar()
    }

    router.push(pageName)
  }

  async function verifyPermissions() {
    const userHasListActivitiesPermission = await verifyUserPermissions("list_activities", userPermissions)
    setListActivitiesPermission(userHasListActivitiesPermission)

    const userHasListMembersPermission = await verifyUserPermissions("list_members", userPermissions)
    setListMembersPermission(userHasListMembersPermission)

    const userHasListPlansPermission = await verifyUserPermissions("list_plans", userPermissions)
    setListPlansPermission(userHasListPlansPermission)

    const userHasListUsersPermission = await verifyUserPermissions("list_users", userPermissions)
    setListUsersPermission(userHasListUsersPermission)

    const userHasListLogsPermission = await verifyUserPermissions("list_logs", userPermissions)
    setListLogssPermission(userHasListLogsPermission)

    const userHasListProductsPermission = await verifyUserPermissions("list_products", userPermissions)
    setListProductsPermission(userHasListProductsPermission)

    const userHasListBrandsPermission = await verifyUserPermissions("list_brands", userPermissions)
    setListBrandsPermission(userHasListBrandsPermission)

    const userHasListGroupsPermission = await verifyUserPermissions("list_groups", userPermissions)
    setListGroupsPermission(userHasListGroupsPermission)
  }

  useEffect(() => {
    verifyPermissions()
  }, [user?.permissions])

  useEffect(() => {
    if (!isOpen) {
      setHideClass(true)
      setHideClassProduct(true)
    }
  }, [isOpen])

  return (
    <Container className={isOpen ? "" : "close"}>
      <div className="logo-container">
        <img src="/images/small-icon.png" alt="Mark One" className="small-icon" />
        <img src="/images/logo.png" alt="Mark One" className="icon" />
      </div>

      <div className="content">
        <div className="list-container">
          <ul>
            <button className="list-button" title="Início" onClick={() => handleNavigateToPage("/dashboard")}>
              <span className="icon">
                <FaHome />
              </span>

              <span className="label">Início</span>
            </button>
            <button
              className="list-button"
              title="Atividades"
              onClick={() => handleNavigateToPage("/activities")}
              disabled={!listActivitiesPermission}
            >
              <span className="icon">
                <FaChartPie />
              </span>

              <span className="label">Atividades</span>
            </button>

            <button
              className="list-button"
              title="Membros"
              onClick={() => handleNavigateToPage("/members")}
              disabled={!listMembersPermission}
            >
              <span className="icon">
                <FaUsers />
              </span>

              <span className="label">Membros</span>
            </button>
            <button
              className="list-button"
              title="Planos"
              onClick={() => handleNavigateToPage("/plans")}
              disabled={!listPlansPermission}
            >
              <span className="icon">
                <FaFolderOpen />
              </span>

              <span className="label">Planos</span>
            </button>
            <button className="list-button" title="Inventário" onClick={handleToggleHideClassProduct}>
              <span className="icon">
                <FaTag />
              </span>

              <div className={hideClassProduct ? "has-submenu" : "has-submenu open"}>
                <span className="label">Inventário</span>

                <span className="label-icon">▼</span>
              </div>
            </button>

            <button
              className={hideClassProduct ? "list-button subitem hide" : "list-button subitem"}
              title="Produtos"
              onClick={() => handleNavigateToPage("/products")}
              disabled={!listProductsPermission}
            >
              <span className="icon submenu">
                <FaArchive />
              </span>
              <span className="label">Produtos</span>
            </button>
            <button
              className={hideClassProduct ? "list-button subitem hide" : "list-button subitem"}
              title="Marcas"
              onClick={() => handleNavigateToPage("/brands")}
              disabled={!listBrandsPermission}
            >
              <span className="icon submenu">
                <FaToolbox />
              </span>
              <span className="label">Marcas</span>
            </button>
            <button
              className={hideClassProduct ? "list-button subitem hide" : "list-button subitem"}
              title="Grupos"
              onClick={() => handleNavigateToPage("/groups")}
              disabled={!listGroupsPermission}
            >
              <span className="icon submenu">
                <FaGripHorizontal />
              </span>
              <span className="label">Grupos</span>
            </button>

            <button
              className="list-button"
              title="Usuários"
              onClick={() => handleNavigateToPage("/users")}
              disabled={!listUsersPermission}
            >
              <span className="icon">
                <FaUser />
              </span>

              <span className="label">Usuários</span>
            </button>
            <button className="list-button" title="Sistema" onClick={handleToggleHideClass}>
              <span className="icon">
                <FaCog />
              </span>

              <div className={hideClass ? "has-submenu" : "has-submenu open"}>
                <span className="label">Sistema</span>

                <span className="label-icon">▼</span>
              </div>
            </button>

            {/* <button
              className={hideClass ? "list-button subitem hide" : "list-button subitem"}
              title="Suporte"
              onClick={() => handleNavigateToPage("/support")}
            >
              <span className="icon submenu">
                <FaEnvelope />
              </span>
              <span className="label">Suporte</span>
            </button> */}

            {/* <button
              className={hideClass ? "list-button subitem hide" : "list-button subitem"}
              title="perguntasFrequentes"
              onClick={() => handleNavigateToPage("/frequently-asked-questions")}
            >
              <span className="icon submenu">
                <FaComments />
              </span>
              <span className="label">Perguntas Frequentes</span>
            </button> */}

            {/* <button
              className={hideClass ? "list-button subitem hide" : "list-button subitem"}
              title="politicasDePrivacidade"
              onClick={() => handleNavigateToPage("/privacy-policies")}
            >
              <span className="icon submenu">
                <FaGavel />
              </span>
              <span className="label">Políticas de privacidade</span>
            </button> */}

            <button
              className={hideClass ? "list-button subitem hide" : "list-button subitem"}
              title="log"
              onClick={() => handleNavigateToPage("/logs")}
              disabled={!listLogsPermission}
            >
              <span className="icon submenu">
                <FaServer />
              </span>
              <span className="label">Logs do Sistema</span>
            </button>

            {/* <button
              className={hideClass ? "list-button subitem hide" : "list-button subitem"}
              title="Sobre"
              onClick={() => handleNavigateToPage("/about")}
            >
              <span className="icon submenu">
                <FaQuestion />
              </span>
              <span className="label">Sobre</span>
            </button> */}
          </ul>
        </div>

        <div className="sign-out-container">
          <ul>
            <button className="list-button" title="Sair" onClick={handleSignOut}>
              <span className="icon">
                <FaSignOutAlt />
              </span>
            </button>

            <div className="user-info">
              <h1 className="name">Olá, {user?.name}</h1>
              <span className="username">#{user?.username}</span>
            </div>
          </ul>
        </div>
      </div>
    </Container>
  )
}
