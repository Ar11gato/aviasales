export interface IFlightTicket {
  carrier: string;
  price: number;
  segments: IFlightSegment[];
}

export interface IFlightSegment {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops: string[];
}

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

export interface IState {
  pagination: number;
  sorter: string;
  filter: Record<string, boolean>;
}

export interface IMyContextProps {
  result: boolean;
  setResult: (result: boolean) => void;
  state: IState;
  setState: (state: IState) => void;
  newFlights: ITicket[];
  setNewFlights: (newFlights: ITicket[]) => void;
}

export interface ITicketProps {
  flightData?: ITicket;
}
