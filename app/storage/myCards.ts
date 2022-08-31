import { Card } from "../types/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "@my_cards";

const getMyCards = async () => {
  const value = await AsyncStorage.getItem(key);
  if (value == null) return new Array<Card>();

  const cards = JSON.parse(value);
  return cards;
};

const getMyCardsToBuy = async () => {
  var cards = await getMyCards();

  const filtered = cards.filter((card: Card) => card.notifyPrice <= card.price);
  return filtered;
};

const addCard = async (card: Card) => {
  var myCards = await getMyCards();
  myCards.push(card);

  await AsyncStorage.setItem(key, JSON.stringify(myCards));
};

const updateCard = async (card: Card) => {
  var myCards = await getMyCards();
  myCards = myCards.filter((item: Card) => item.id !== card.id);
  myCards.push(card);

  try {
    await AsyncStorage.setItem(key, JSON.stringify(myCards));
  } catch (e) {
    // saving error
  }
};

const deleteAllMyCards = async () => {
  await AsyncStorage.removeItem(key);
};

export default {
  getMyCards,
  getMyCardsToBuy,
  deleteAllMyCards,
  addCard,
  updateCard,
};
