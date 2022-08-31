import React from "react";
import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import CardList from "../components/CardList";
import Screen from "../components/Screen";

export default function LatestScreen({
  navigation,
}: RootTabScreenProps<"Latest">) {
  return (
    <Screen style={styles.screen}>
      <CardList navigation={navigation} filterToCardsToBuy={true} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {},
});
