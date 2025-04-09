import { Card } from "antd";
import classes from "./Ticket.module.scss";

import { ITicket } from "../../hooks/MyContextProvider.tsx";

interface TicketProps {
  flightData?: ITicket;
}

const Ticket = ({ flightData }: TicketProps) => {
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  const formatTime2 = (dateString: string): string => {
    const date = new Date(dateString);
    date.setMinutes(
      date.getMinutes() + (flightData?.segments[0].duration ?? 0),
    );
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleChange = (e: number) => {
    switch (e) {
      case 0:
        return "ПЕРЕСАДОК";
      case 1:
        return "ПЕРЕСАДКА";
      case 2:
      case 3:
        return "ПЕРЕСАДКИ";
    }
  };

  return (
    <div>
      <Card
        className={classes.card}
        classNames={{
          header: "my-card",
          title: "my-card",
          extra: "my-card",
          body: "my-card",
        }}
        title={flightData?.price + " Р"}
        extra={
          <img
            className={classes.image}
            src={`//pics.avs.io/99/36/${flightData?.carrier}.png`}
            alt=""
          />
        }
        style={{
          width: `100%`,
          marginBottom: 0,
        }}
        styles={{
          header: {
            borderBottom: "none",
          },
          title: {
            marginTop: "10px",
            display: "flex",
            alignSelf: "center",
            fontSize: "30px",
            color: "blue",
          },
          extra: {
            marginTop: "10px",
            width: "140px",
          },
          body: {
            height: "70%",
          },
        }}
      >
        <div className={classes.info}>
          <div className={classes.route}>
            <div className={classes.first}>
              <span className={classes.grey}>
                {flightData?.segments[0]?.origin} -{" "}
                {flightData?.segments[0]?.destination}
              </span>
              <span>
                {formatTime(flightData?.segments[0].date ?? "")} -{" "}
                {formatTime2(flightData?.segments[0]?.date ?? "")}
              </span>
            </div>
            <div className={classes.second}>
              <span className={classes.grey}>
                {flightData?.segments[1]?.origin} -{" "}
                {flightData?.segments[1]?.destination}
              </span>
              <span>
                {formatTime(flightData?.segments[1]?.date ?? "")} -{" "}
                {formatTime2(flightData?.segments[1]?.date ?? "")}
              </span>
            </div>
          </div>
          <div className={classes.length}>
            <div className={classes.first}>
              <span className={classes.grey}>В ПУТИ</span>
              <span>
                {Math.floor((flightData?.segments[0]?.duration ?? 0) / 60)}ч{" "}
                {(flightData?.segments[0]?.duration ?? 0) -
                  Math.floor((flightData?.segments[0]?.duration ?? 0) / 60) *
                    60}
                м
              </span>
            </div>
            <div className={classes.second}>
              <span className={classes.grey}>В ПУТИ</span>
              <span>
                {Math.floor((flightData?.segments[1]?.duration ?? 0) / 60)}ч{" "}
                {(flightData?.segments[1]?.duration ?? 0) -
                  Math.floor((flightData?.segments[1]?.duration ?? 0) / 60) *
                    60}
                м
              </span>
            </div>
          </div>
          <div className={classes.stops}>
            <div className={classes.first}>
              <span className={classes.grey}>
                {flightData?.segments[0]?.stops.length}{" "}
                {handleChange(flightData?.segments[0]?.stops.length ?? 0)}
              </span>
              <span>{flightData?.segments[0]?.stops.join(", ")}</span>
            </div>
            <div className={classes.second}>
              <span className={classes.grey}>
                {flightData?.segments[1]?.stops.length}{" "}
                {handleChange(flightData?.segments[1]?.stops.length ?? 0)}
              </span>
              <span>{flightData?.segments[1]?.stops.join(", ")}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ticket;
