import axios from "axios";

import { IFlightTicket } from "../types/types.ts";

interface IPost {
  stop: boolean;
  tickets: IFlightTicket[];
}

export const getDataId = async () => {
  try {
    return await axios.get("https://aviasales-test-api.kata.academy/search");
  } catch (error) {
    console.error("error axios getDataId", error);
    throw error;
  }
};
export const getDataTickets = async (id: string) => {
  try {
    return await axios.get<IPost[]>(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`,
    );
  } catch (error) {
    console.error("error axios getDataTickets", error);
    throw error;
  }
};
