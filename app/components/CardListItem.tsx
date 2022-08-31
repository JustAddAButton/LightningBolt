import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Card } from "../types/Card";

function CardListItem({ item, onPress }: { item: Card; onPress: any }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemView}>
        <View style={styles.itemImageView}>
          <Image
            source={{
              uri: `${item.thumbnailImageUrl}`,
            }}
            style={styles.thumbnailImage}
          />
        </View>
        <View style={styles.itemTextView}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.notifyPrice}>${item.notifyPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemImageView: {},
  itemTextView: {
    marginLeft: 6,
    flexDirection: "column",
  },
  itemView: {
    flexDirection: "row",
    padding: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notifyPrice: {
    fontSize: 15,
    color: "green",
  },
  price: {
    fontSize: 15,
  },
  thumbnailImage: {
    height: 70,
    resizeMode: "stretch",
    width: 50,
  },
});

export default CardListItem;
