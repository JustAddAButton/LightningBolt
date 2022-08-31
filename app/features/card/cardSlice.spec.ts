import cardReducer, {
  CardState,
  increment,
  decrement,
  incrementByAmount,
} from "./cardSlice";

describe("card reducer", () => {
  const initialState: CardState = {
    value: 3,
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(cardReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
      status: "idle",
    });
  });

  it("should handle increment", () => {
    const actual = cardReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it("should handle decrement", () => {
    const actual = cardReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it("should handle incrementByAmount", () => {
    const actual = cardReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
