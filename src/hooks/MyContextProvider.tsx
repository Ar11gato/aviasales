import React, { useState, useEffect } from "react";
import { getDataId, getDataTickets } from "../api/getSearchId.ts";

import { createContext } from "react";
import { IMyContextProps, IState, ITicket } from "../types/types.ts";
import { useQuery } from "@tanstack/react-query";

export const MyContext = createContext<IMyContextProps | null>(null);

function getSearchId() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery({
    queryKey: ["searchId"],
    queryFn: getDataId,
    select: (data) => data.data.searchId,

    retryDelay: 5000,
  });

  return { searchId: data };
}

function getFlights(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery({
    queryKey: ["flights"],
    queryFn: () => getDataTickets(id),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    select: (data) => data.data.tickets,

    // retryDelay: 5000,
  });

  return { flights: data };
}

export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newFlights, setNewFlights] = useState<ITicket[]>([]);

  const [state, setState] = useState<IState>({
    pagination: 5,
    sorter: "cheapest",
    filter: {
      all: false,
      noStops: true,
      oneStop: false,
      twoStops: false,
      threeStops: false,
    },
  });

  const [result, setResult] = useState<boolean>(true);

  const { searchId } = getSearchId();
  const { flights } = getFlights(searchId);

  useEffect(() => {
    if (flights) {
      setNewFlights(flights);
    }
  }, [flights]);

  return (
    <MyContext.Provider
      value={{
        state,
        setState,
        newFlights,
        setNewFlights,
        result,
        setResult,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
