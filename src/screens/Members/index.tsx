import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

import { api } from "../../services/api.service";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";
import { StatusModal } from "../../components/Modals/Status";
import { PlansModal } from "../../components/Modals/Plan";
import { InputModal } from "../../components/Modals/Input";

import {
  Container,
  MemberCardContainer,
  MemberCardIndex,
  MemberCardPlan,
  MemberCardPlanText,
  MemberCardRow,
  MemberCardSeparator,
  MemberCardStatusCircle,
  MemberCardText,
  MemberCardTitle,
} from "./styles";

type PlanProps = {
  id: string;
  name: string;
  value: number;
};

// const members = [
//   {
//     id: "bruno-gaspar",
//     name: "Bruno Gaspar",
//     email: "bruninhoogaspar@gmail.com",
//     phone: "(45) 9 9996-2223",
//     plan: {
//       id: "gold-plan",
//       name: "Ouro",
//     },
//     disabled: false,
//     createdAt: "2021-12-27",
//   },
//   {
//     id: "guilherme-locks",
//     name: "Guilherme Locks",
//     email: "guilherme.outsystems@gmail.com",
//     phone: "(45) 9 9818-3657",
//     plan: {
//       id: "silver-plan",
//       name: "Prata",
//     },
//     disabled: false,
//     createdAt: "2021-12-27",
//   },
//   {
//     id: "lucas-zorzan",
//     name: "Lucas Zorzan",
//     email: "lucaszorzan14@gmail.com",
//     phone: "(45) 9 9999-1234",
//     plan: {
//       id: "bronze-plan",
//       name: "Bronze",
//     },
//     disabled: true,
//     createdAt: "2022-02-08",
//   },
// ];

export function Members() {
  const statusRef = useRef<RBSheet>(null);
  const planRef = useRef<RBSheet>(null);
  const nameRef = useRef<RBSheet>(null);

  const [members, setMembers] = useState<MemberProps[]>([]);

  const [status, setStatus] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanProps | null>(null);
  const [name, setName] = useState<string | null>("");

  const [filteredData, setFilteredData] = useState<MemberProps[] | null>(null);

  function handleOpenModal(modal: "status" | "name" | "plan") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      case "name": {
        nameRef.current?.open();
        break;
      }
      case "plan": {
        planRef.current?.open();
        break;
      }
    }
  }

  const statusName = status === "enabled" ? "Ativo" : "Inativo";

  useEffect(() => {
    async function loadMembers() {
      const response = await api.get("/members");
      setMembers(response.data);
    }

    loadMembers();
  }, []);

  useEffect(() => {
    let newData = members;
    if (name) {
      newData = newData.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = name.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setName(name);
    } else {
      if (status || plan) {
        setFilteredData(newData);
      } else {
        setFilteredData(members);
      }
      setName(name);
    }

    if (status) {
      newData = newData.filter((item) => item.disabled === (status === "disabled"));
      setFilteredData(newData);
      setStatus(status);
    } else {
      if (name || plan) {
        setFilteredData(newData);
      } else {
        setFilteredData(members);
      }
      setStatus(status);
    }

    if (plan) {
      newData = newData.filter(function (item) {
        if (item.plan.id) {
          const itemData = item.plan.id.toUpperCase();
          const textData = plan.id.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setPlan(plan);
    } else {
      if (status || name) {
        setFilteredData(newData);
      } else {
        setFilteredData(members);
      }
      setPlan(plan);
    }
  }, [name, status, plan, members.length]);

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Membros filtrados" value={filteredData?.length || 0} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={name || "Nome"} ml onPress={() => handleOpenModal("name")} />
          <Filter title={plan ? plan.name : "Plano"} ml onPress={() => handleOpenModal("plan")} />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(member) => member.id}
          renderItem={({ item, index }) => <MemberCard member={item} index={index} total={filteredData?.length || 0} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
        />
      </Container>

      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <PlansModal modalRef={planRef} selectedPlan={plan} setSelectedPlan={setPlan} />
      <InputModal modalRef={nameRef} selectedText={name} setSelectedText={setName} />
    </>
  );
}

// MemberCard

type MemberProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: {
    id: string;
    name: string;
  };
  disabled: boolean;
  createdAt: string;
};

type MemberCardProps = {
  member: MemberProps;
  index: number;
  total: number;
};

function MemberCard({ member, index, total }: MemberCardProps) {
  const createdAt = moment(member.createdAt).format("DD/MM/YYYY");

  return (
    <MemberCardContainer>
      <MemberCardTitle>{member.name}</MemberCardTitle>

      <MemberCardSeparator />

      <MemberCardRow>
        <MemberCardText>{member.email}</MemberCardText>
        <MemberCardPlan>
          <MemberCardPlanText>{member.plan.name}</MemberCardPlanText>
        </MemberCardPlan>
      </MemberCardRow>

      <MemberCardText>{member.phone}</MemberCardText>

      <MemberCardRow>
        <MemberCardRow>
          <MemberCardStatusCircle disabled={member.disabled} />
          <MemberCardText>{member.disabled ? "Inativo" : "Ativo"}</MemberCardText>
        </MemberCardRow>

        <MemberCardText>Cadastro: {createdAt}</MemberCardText>
      </MemberCardRow>

      <MemberCardIndex>
        {index + 1}/{total}
      </MemberCardIndex>
    </MemberCardContainer>
  );
}
