import { Card } from "antd";
import classes from "./Ticket.module.scss";
import { ITicketProps } from "../../types/types.ts";
import {
  formatTime,
  formatTime2,
  handleChange,
} from "../../helpers/helpers.ts";

const Ticket = ({ flightData }: ITicketProps) => {
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
                {formatTime2(
                  flightData?.segments[0]?.date ?? "",
                  flightData?.segments[0]?.duration ?? 0,
                )}
              </span>
            </div>
            <div className={classes.second}>
              <span className={classes.grey}>
                {flightData?.segments[1]?.origin} -{" "}
                {flightData?.segments[1]?.destination}
              </span>
              <span>
                {formatTime(flightData?.segments[1]?.date ?? "")} -{" "}
                {formatTime2(
                  flightData?.segments[1]?.date ?? "",
                  flightData?.segments[1]?.duration ?? 0,
                )}
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
