import classes from "./Sidebar.module.scss";
import { Checkbox, ConfigProvider } from "antd";
import useCheckbox from "../../hooks/useCheckbox.ts";

import { useMyContext } from "../../hooks/useMyContext.ts";

const Sidebar = () => {
  const context = useMyContext();

  const all = useCheckbox("all");
  const noStops = useCheckbox("noStops");
  const oneStop = useCheckbox("oneStop");
  const twoStops = useCheckbox("twoStops");
  const threeStops = useCheckbox("threeStops");
  const array = [all, noStops, oneStop, twoStops, threeStops];
  const checkboxClassNames: string[] = [
    "all",
    "noStops",
    "oneStop",
    "twoStops",
    "threeStops",
  ];
  const checkboxNames: string[] = [
    "Все",
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ];

  return (
    <div className={classes.container}>
      <div className={classes.title}>количество пересадок</div>
      <ConfigProvider
        theme={{
          token: {
            controlInteractiveSize: 25,
            colorPrimary: "#ffffff",
            colorWhite: "#2504ff",
          },
        }}
      >
        <div className={classes.checkboxes}>
          {array.map((item, i: number) => (
            <Checkbox
              {...item}
              checked={context?.state.filter[checkboxClassNames[i]]}
              className={classes.checkbox}
              key={checkboxClassNames[i]}
            >
              {checkboxNames[i]}
            </Checkbox>
          ))}
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Sidebar;
