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
