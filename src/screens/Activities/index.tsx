import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { FilterWrapper } from "../../components/FilterWrapper";

import { formatCurrency } from "../../helpers/strings.helper";

import { styles } from "../../styles/global";

import {
  Container,
  ActivityCardContainer,
  ActivityCardIndex,
  ActivityCardRow,
  ActivityCardSeparator,
  ActivityCardStatusCircle,
  ActivityCardText,
  ActivityCardTitle,
  ActivityCardNumber,
  TotalCard,
  TotalCardTitle,
  TotalCardHighlight,
  TotalCardContainer,
  TotalCardButton,
} from "./styles";

const activities = [
  {
    id: "1",
    member: "Guilherme Locks Gregorio",
    totalItems: 7,
    seller: "Bruno Gaspar",
    value: 299.99,
    status: "open",
    createdAt: "2021-12-27",
  },
  {
    id: "2",
    member: "Joaquim Pereira",
    totalItems: 3,
    seller: "Bruno Gaspar",
    value: 123.99,
    status: "cancelled",
    createdAt: "2021-12-27",
    cancelledAt: "2022-01-05",
  },
  {
    id: "3",
    member: "Maria Apacerecida",
    totalItems: 10,
    seller: "Mohammed Ali",
    value: 350.99,
    status: "closed",
    createdAt: "2021-12-27",
    finishedAt: "2021-12-27",
  },
];

export function Activities() {
  const activitiesTotal = activities.reduce((acc, activity) => acc + activity.value, 0);

  const total = formatCurrency(activitiesTotal);

  return (
    <Container>
      <Header />
      {/* <TotalCard title="Atividades filtradas" value={activities.length} /> */}
      <TotalCard>
        <TotalCardContainer>
          <TotalCardTitle>Atividades filtradas</TotalCardTitle>
          <TotalCardHighlight>{total}</TotalCardHighlight>
        </TotalCardContainer>

        <TotalCardButton activeOpacity={0.8}>
          <Ionicons name="add-outline" size={40} color={styles.colors.text} />
        </TotalCardButton>
      </TotalCard>

      <FilterWrapper>
        <Filter title="Status" />
        <Filter title="Membro" ml />
        <Filter title="Data" ml />
      </FilterWrapper>

      <FlatList
        data={activities}
        keyExtractor={(activity) => activity.id}
        renderItem={({ item, index }) => <ActivityCard activity={item} index={index} total={activities.length} />}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: -16,
        }}
      />
    </Container>
  );
}

// ActivityCard

type ActivityProps = {
  id: string;
  member: string;
  totalItems: number;
  seller: string;
  value: number;
  status: string;
  createdAt: string;
  cancelledAt?: string;
  finishedAt?: string;
};

type ActivityCardProps = {
  activity: ActivityProps;
  index: number;
  total: number;
};

function ActivityCard({ activity, index, total }: ActivityCardProps) {
  const createdAt = moment(activity.createdAt).format("DD/MM/YYYY");
  const finishedAt = moment(activity.finishedAt).format("DD/MM/YYYY");
  const cancelledAt = moment(activity.cancelledAt).format("DD/MM/YYYY");

  const value = formatCurrency(activity.value);

  const status: { [key: string]: string } = {
    open: "Aberta",
    cancelled: "Cancelada",
    closed: "Encerrada",
  };

  return (
    <ActivityCardContainer activeOpacity={0.6}>
      <ActivityCardTitle>{activity.member}</ActivityCardTitle>

      <ActivityCardSeparator />

      <ActivityCardRow>
        <ActivityCardText>Itens: {activity.totalItems}</ActivityCardText>
        <ActivityCardText>Vendedor: {activity.seller}</ActivityCardText>
      </ActivityCardRow>

      <ActivityCardRow>
        <ActivityCardText>
          <ActivityCardNumber>{value}</ActivityCardNumber>
        </ActivityCardText>
        <ActivityCardText>Criação: {createdAt}</ActivityCardText>
      </ActivityCardRow>

      <ActivityCardRow>
        <ActivityCardRow>
          <ActivityCardStatusCircle status={activity.status} />
          <ActivityCardText>{status[activity.status]}</ActivityCardText>
        </ActivityCardRow>

        {activity.finishedAt && !activity.cancelledAt && <ActivityCardText>Encerramento: {finishedAt}</ActivityCardText>}
        {activity.cancelledAt && <ActivityCardText>Cancelamento: {cancelledAt}</ActivityCardText>}
      </ActivityCardRow>

      <ActivityCardIndex>
        {index + 1}/{total}
      </ActivityCardIndex>
    </ActivityCardContainer>
  );
}
