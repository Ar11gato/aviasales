import { useState, PropsWithChildren, useEffect } from "react";
import { getFlights, getSearchId } from "../api/getSearchId.ts";

export interface ISegment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}
export interface ITicket {
  price: number;
  carrier: string;
  segments: ISegment[];
}

interface IState {
  pagination: number;
  sorter: string;
  filter: {
    all: boolean;
    noStops: boolean;
    oneStop: boolean;
    twoStops: boolean;
    threeStops: boolean;
  };
}

export interface IMyContextProps {
  state: IState;
  setState: (state: IState) => void;
  newFlights: ITicket[];
  setNewFlights: (newFlights: ITicket[]) => void;
}
import { createContext } from "react";

export const MyContext = createContext<IMyContextProps | null>(null);

export const MyContextProvider = ({ children }: PropsWithChildren) => {
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
