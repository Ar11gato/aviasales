import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { IFlightTicket } from "../types/types.ts";

interface IPost {
  stop: boolean;
  tickets: IFlightTicket[];
}

const getDataId = async () => {
  try {
    return await axios.get("https://aviasales-test-api.kata.academy/search");
  } catch (error) {
    console.error("error axios getDataId", error);
    throw error;
  }
};
const getDataTickets = async (id: string) => {
  try {
    return await axios.get<IPost[]>(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`,
    );
  } catch (error) {
    console.error("error axios getDataTickets", error);
    throw error;
  }
};

export function getSearchId() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery({
    queryKey: ["searchId"],
    queryFn: getDataId,
    select: (data) => data.data.searchId,
    retry: 3,
    retryDelay: 5000,
  });

  return { searchId: data };
}

export function getFlights(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery({
    queryKey: ["flights"],
    queryFn: () => getDataTickets(id),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    select: (data) => data.data.tickets,
    retry: 3,
    // retryDelay: 5000,
  });

  return { flights: data };
}
