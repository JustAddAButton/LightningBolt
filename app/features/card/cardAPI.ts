import { GetAutoCompleteCardsByName } from "../../types";
import client from "../../utils/client";

const endpoint = "/cards";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchAutocompleteCardsByName = (title:string) => async (dispatch:any) => {
  try {
    const url = `${endpoint}/autocomplete?q=${name}`;
    const response = await client.get(url);
    const data = response.data as any;

    dispatch({
      type: GetAutoCompleteCardsByName,
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};