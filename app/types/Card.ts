export class Card {
  name: string;
  id: string;
  thumbnailImageUrl: string;
  imageUrl: string;
  price: number;
  set: string;
  rarity: string;
  buyUrlForTcgPlayer: string;
  notifyPrice: number;

  constructor({
    name,
    id,
    thumbnailImageUrl,
    imageUrl,
    price,
    set,
    rarity,
    buyUrlForTcgPlayer,
    notifyPrice,
  }: any) {
    this.name = name;
    this.id = id;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.imageUrl = imageUrl;
    this.price = price;
    this.set = set;
    this.rarity = rarity;
    this.buyUrlForTcgPlayer = buyUrlForTcgPlayer;
    this.notifyPrice = notifyPrice;
  }

  compareName(name: string) {
    return this.name.toLowerCase() === name.toLowerCase().trim();
  }
}
