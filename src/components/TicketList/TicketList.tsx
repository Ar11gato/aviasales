import classes from "./TicketList.module.scss";
import Ticket from "../Ticket/Ticket.tsx";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useMyContext } from "../../hooks/useMyContext.ts";
import { ITicket } from "../../types/types.ts";
import PaginationButton from "../PaginationButton/PaginationButton.tsx";

const TicketList = () => {
  const { newFlights, state } = useMyContext();
  const [sortedFlights, setSortedFlights] = useState<ITicket[]>([]);
  const [filterFlights, setFilterFlights] = useState<ITicket[]>([]);

  const getFilterFlights = (stops: number) => {
    setFilterFlights((prev) =>
      prev.concat(
        newFlights.filter(
          (item) =>
            item.segments[0].stops.length + item.segments[1].stops.length ===
            stops,
        ),
      ),
    );
  };

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
      getFilterFlights(0);
    }
    if (state.filter.oneStop) {
      getFilterFlights(1);
    }
    if (state.filter.twoStops) {
      getFilterFlights(2);
    }
    if (state.filter.threeStops) {
      getFilterFlights(3);
    }
  }, [state.filter, newFlights]);

  return (
    <div className={classes.container}>
      <Space direction="vertical" size={"middle"} style={{ display: "flex" }}>
        {sortedFlights.length ? (
          sortedFlights.map((item) => (
            <Ticket
              flightData={item}
              key={item.price + item.segments[0].date}
            />
          ))
        ) : !state.filter.noStops ? (
          <div className={classes.warning}>
            {" "}
            Рейсов, подходящих под заданные фильтры, не найдено
          </div>
        ) : (
          <div className={classes.loading}>
            LOADING BRO <div className={classes.loader}></div>{" "}
          </div>
        )}
        {sortedFlights.length ? <PaginationButton /> : null}
      </Space>
    </div>
  );
};

export default TicketList;
