import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types";
import CardDetail from "../components/CardDetail";
import { Card } from "../types/Card";
export default function CardDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<"CardDetails">) {
  const card = route.params.card as Card;

  useEffect(() => {
    navigation.setOptions({ title: card.name });
  });

  return (
    <CardDetail
      card={card}
      isNew={false}
      onSavingComplete={() => {
        navigation.goBack();
      }}
    />
  );
}
