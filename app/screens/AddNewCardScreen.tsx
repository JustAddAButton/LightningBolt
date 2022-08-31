import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  View,
  Text,
} from "react-native";

import React, { useState } from "react";
import { Card } from "../types/Card";
import { RootStackScreenProps } from "../../types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ObjectUtils } from "../utils/ObjectUtils";
import CardDetail from "../components/CardDetail";
import Colors from "../constants/Colors";
import cardsApi from "../api/cards";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function AddNewCardScreen({
  navigation,
}: RootStackScreenProps<"AddNewCard">) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const card = { ...selectedCard } as Card;

  async function lookupCards(name: string) {
    setSelectedCard({});
    if (name.length < 4) {
      setCards([]);
      return;
    }
    const response = await cardsApi.getCardNames(name);
    setCards(response);
  }

  async function handleItemPress(name: string) {
    const card = await cardsApi.getCard(name);
    setSelectedCard(card);
  }

  const ItemRender = (item: Card) => (
    <TouchableOpacity
      onPress={() => {
        handleItemPress(item.name);
      }}
    >
      <View style={styles.itemRow}>
        <Text style={styles.itemText}> {item.name} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <Ionicons name="search" style={styles.inputIcon} size={18} />
          <TextInput
            style={styles.inputTextInput}
            placeholder="Search"
            placeholderTextColor={"#8e8e8f"}
            onChangeText={(newText) => lookupCards(newText)}
          />
        </View>
        <Button title="Cancel" onPress={() => close()} />
      </View>
      {ObjectUtils.isObjectEmpty(card) ? (
        cards.length > 0 && (
          <FlatList
            data={cards}
            renderItem={({ item }) => <ItemRender name={item} id={0} />}
            ItemSeparatorComponent={() => (
              <View style={styles.itemRowDivider} />
            )}
            keyExtractor={(item: Card) => item.id}
            style={styles.list}
          />
        )
      ) : (
        <ScrollView contentContainerStyle={styles.cardDetailContainer}>
          <CardDetail
            card={selectedCard as Card}
            isNew={true}
            onSavingComplete={() => {
              navigation.goBack();
            }}
          />
        </ScrollView>
      )}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardDetailContainer: {
    justifyContent: "center",
    width: screenWidth,
    padding: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 0,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    paddingLeft: 6,
  },
  inputIcon: {
    color: Colors.textInputColor,
    marginRight: 6,
    marginTop: 1,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  inputTextInput: {
    color: Colors.textInputColor,
    fontSize: 18,
    width: "90%",
  },
  inputView: {
    backgroundColor: "#fefefe",
    borderBottomColor: Colors.textInputPlaceholderColor,
    borderTopColor: Colors.textInputPlaceholderColor,
    borderLeftColor: Colors.textInputPlaceholderColor,
    borderRightColor: Colors.textInputPlaceholderColor,
    borderWidth: 0.5,
    borderRadius: 12,
    flexDirection: "row",
    flex: 3,
    fontSize: 18,
    borderColor: "#000",
    width: "100%",
  },
  itemRow: {
    backgroundColor: "#fff",
    padding: 14,
    width: "100%",
  },
  itemRowDivider: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.textInputBackgroundColor,
  },
  itemText: {
    fontSize: 16,
  },
  list: {
    marginTop: 4,
    width: "100%",
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
