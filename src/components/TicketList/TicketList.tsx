import classes from "./TicketList.module.scss";
import Ticket from "../Ticket/Ticket.tsx";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useMyContext } from "../../hooks/useMyContext.ts";
import { ITicket } from "../../hooks/MyContextProvider.tsx";

const TicketList = () => {
  const { newFlights, state } = useMyContext();
  const [sortedFlights, setSortedFlights] = useState<ITicket[]>([]);
  const [filterFlights, setFilterFlights] = useState<ITicket[]>([]);

  useEffect(() => {
    if (state.sorter === "cheapest") {
      setSortedFlights(
        filterFlights
          .sort((a, b) => a.price - b.price)
          .slice(0, state.pagination),
      );
    } else if (state.sorter === "fastest") {
      setSortedFlights(
        filterFlights
          .sort((ticketA, ticketB) => {
            const totalDurationA = ticketA.segments.reduce((sum, segment) => {
              return sum + segment.duration;
            }, 0);

            const totalDurationB = ticketB.segments.reduce((sum, segment) => {
              return sum + segment.duration;
            }, 0);

            return totalDurationA - totalDurationB;
          })
          .slice(0, state.pagination),
      );
    }
  }, [state.pagination, state.sorter, filterFlights]);

  useEffect(() => {
    setFilterFlights([]);
    if (
      !state.filter.all &&
      !state.filter.noStops &&
      !state.filter.oneStop &&
      !state.filter.twoStops &&
      !state.filter.threeStops
    ) {
      return;
    }

    if (state.filter.all) {
      setFilterFlights(newFlights);
      return;
    }
    if (state.filter.noStops) {
      setFilterFlights((prev) =>
        prev.concat(
          newFlights.filter(
            (item) =>
              item.segments[0].stops.length + item.segments[1].stops.length ===
              0,
          ),
        ),
      );
    }
    if (state.filter.oneStop) {
      setFilterFlights((prev) =>
        prev.concat(
          newFlights.filter(
            (item) =>
              item.segments[0].stops.length + item.segments[1].stops.length ===
              1,
          ),
        ),
      );
    }
    if (state.filter.twoStops) {
      setFilterFlights((prev) =>
        prev.concat(
          newFlights.filter(
            (item) =>
              item.segments[0].stops.length + item.segments[1].stops.length ===
              2,
          ),
        ),
      );
    }
    if (state.filter.threeStops) {
      setFilterFlights((prev) =>
        prev.concat(
          newFlights.filter(
            (item) =>
              item.segments[0].stops.length + item.segments[1].stops.length ===
              3,
          ),
        ),
      );
    }
  }, [state.filter, newFlights]);

  return (
    <div className={classes.container}>
      <Space direction="vertical" size={"middle"} style={{ display: "flex" }}>
        {sortedFlights.map((item) => (
          <Ticket flightData={item} key={item.price + item.segments[0].date} />
        ))}
      </Space>
    </div>
  );
};

export default TicketList;
