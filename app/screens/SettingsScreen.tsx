import { Button, StyleSheet, View, Text } from "react-native";

import { RootTabScreenProps } from "../../types";
import React from "react";
import myCards from "../storage/myCards";

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<"Settings">) {
  async function handlePress_ClearMyCardList() {
    await myCards.deleteAllMyCards();
    alert("My Card List has been reset!");
  }

  async function handlePress_ViewMyCardList() {
    const cards = await myCards.getMyCards();
    console.log(cards);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} />
      <View>
        <Button
          title="View My Card List in console"
          onPress={() => handlePress_ViewMyCardList()}
        />
        <Button
          title="Clear My Card List"
          onPress={() => handlePress_ClearMyCardList()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
