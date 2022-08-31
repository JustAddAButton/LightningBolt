import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, VirtualizedList, StyleSheet, Text } from "react-native";
import { Card } from "../types/Card";
import CardListItem from "../components/CardListItem";
import myCards from "../storage/myCards";

function CardList({
  navigation,
  filterToCardsToBuy,
}: {
  navigation: any;
  filterToCardsToBuy: boolean;
}) {
  const [cards, setCards] = useState(Array<Card>);

  useFocusEffect(
    React.useCallback(() => {
      fetchCards();
    }, [navigation])
  );

  async function fetchCards() {
    let cards = new Array<Card>();
    if (filterToCardsToBuy == true) {
      cards = await myCards.getMyCardsToBuy();
    } else {
      cards = await myCards.getMyCards();
    }

    setCards(cards);
  }

  function OpenCardDetails(card: Card) {
    navigation.navigate("CardDetails", {
      card: card,
    });
  }

  return (
    <View style={styles.container}>
      {cards.length > 0 && (
        <VirtualizedList
          data={cards}
          initialNumToRender={4}
          renderItem={({ item }) => (
            <CardListItem
              item={item}
              onPress={(card: Card) => OpenCardDetails(card)}
            />
          )}
          keyExtractor={(item: Card) => item.id}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 6,
  },
  itemRow: {
    backgroundColor: "#fff",
    padding: 10,
  },
  list: {
    marginTop: 4,
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default CardList;
