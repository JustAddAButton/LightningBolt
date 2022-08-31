import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import React from "react";
import { RootTabScreenProps } from "../../types";
import CardList from "../components/CardList";

export default function MyCardListScreen({
  navigation,
}: RootTabScreenProps<"MyCardList">) {
  return (
    <Screen style={styles.screen}>
      <CardList navigation={navigation} filterToCardsToBuy={false} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {},
});
