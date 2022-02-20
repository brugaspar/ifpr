import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px;
`;

// PlanCard

type PlanCardStatusCircleProps = {
  disabled: boolean;
};

export const PlanCardContainer = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const PlanCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 11px;
  color: ${styles.colors.green};
`;

export const PlanCardSeparator = styled.View`
  height: 1px;
  margin: 5px 0;
  background: ${styles.colors.line};
`;

export const PlanCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 11px;
  color: ${styles.colors.text};
  line-height: 18px;
`;

export const PlanCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PlanCardStatusCircle = styled.View<PlanCardStatusCircleProps>`
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? styles.colors.red : styles.colors.green)};
  margin-right: 5px;
`;

export const PlanCardIndex = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 10px;
  color: ${styles.colors.green};
  align-self: flex-end;
  margin-top: 8px;
`;
