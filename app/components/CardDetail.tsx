import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  Linking,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import { Card } from "../types/Card";
import myCards from "../storage/myCards";

function CardDetail({
  card,
  isNew,
  onSavingComplete,
}: {
  card: Card;
  isNew: boolean;
  onSavingComplete: any;
}) {
  const [price, setPrice] = useState(
    card.notifyPrice > 0 ? card.notifyPrice : card.price
  );

  const onPress_BuyAtTcgPlayer = async (url: string) => {
    await Linking.canOpenURL(url);
    Linking.openURL(url);
  };

  async function Add() {
    card.notifyPrice = price;
    await myCards.addCard(card);
    onSavingComplete();
  }
  async function Save() {
    let updatedCard = { ...card } as Card;
    updatedCard.notifyPrice = price;

    await myCards.updateCard(updatedCard);
    onSavingComplete();
  }

  function onPriceUpdated(text: string) {
    console.log(text);
    setPrice(+text);
  }

  return (
    <View style={styles.container}>
      {isNew ? (
        <Button title="Add to My Card List" onPress={() => Add()} />
      ) : (
        <Button title="Save Changes" onPress={() => Save()} />
      )}
      <View style={styles.infoContainer}>
        <Image
          source={{
            uri: `${card.imageUrl}`,
          }}
          style={styles.image}
        />
        <View style={styles.infoDetails}>
          <Text style={styles.name}>{card.name}</Text>
          <Text style={styles.label}>{card.set}</Text>
          <Text style={styles.label}>${card.price}</Text>
        </View>
        <View style={styles.infoPrice}>
          <Text style={styles.label}>Notify me when price is below:</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="logo-usd" style={styles.inputIcon} size={18} />
            <TextInput
              style={styles.inputPrice}
              keyboardType="decimal-pad"
              placeholder={price.toString()}
              value={price.toString()}
              onChangeText={(text) => onPriceUpdated(text)}
            />
          </View>
          <Button
            onPress={() => onPress_BuyAtTcgPlayer(card.buyUrlForTcgPlayer)}
            title="Buy at TCG Player"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    alignSelf: "flex-start",
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginRight: 0,
  },
  infoDetails: {
    backgroundColor: "#fafafa",
    borderBottomColor: "#c2c2c2",
    borderTopColor: "#c2c2c2",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 4,
    marginBottom: 0,
    marginHorizontal: 10,
    width: "100%",
  },
  infoPrice: {
    backgroundColor: "#fafafa",
    borderBottomColor: "#c2c2c2",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 4,
    marginBottom: 0,
    marginHorizontal: 10,
    width: "100%",
  },
  image: {
    resizeMode: "stretch",
    height: 418,
    width: 300,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 6,
    marginTop: 6,
  },
  inputIcon: {
    color: Colors.textInputColor,
    fontSize: 20,
    marginTop: 2,
    left: -25,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  inputPrice: {
    alignContent: "center",
    backgroundColor: Colors.textInputBackgroundColor,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    left: -25,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
  },
});

export default CardDetail;
