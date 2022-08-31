import client from "./client";
import { Card } from "../types/Card";

const endpoint = "/cards";

const getCardNames = async (name: string) => {
  var url = `${endpoint}/autocomplete?q=${name}`;
  var response = await client.get(url);
  var data = response.data as any;
  return data.data;
};

const getCard = async (name: string) => {
  var url = `${endpoint}/named?exact=${name}`;
  var response = await client.get(url);
  var data = response.data as any;

  var card = new Card({
    ...data,
    thumbnailImageUrl: data.image_uris.small,
    imageUrl: data.image_uris.normal,
    price: data.prices.usd,
    set: data.set_name,
    buyUrlForTcgPlayer: data.purchase_uris.tcgplayer,
  });

  return card;
};

export default {
  getCardNames,
  getCard,
};
