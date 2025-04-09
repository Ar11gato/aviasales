import classes from "./Sidebar.module.scss";
import { Checkbox, ConfigProvider } from "antd";
import useCheckbox from "../../hooks/useCheckbox.ts";
import { useContext } from "react";
import { MyContext } from "../../hooks/MyContextProvider.tsx";

const Sidebar = () => {
  const context = useContext(MyContext);

  const all = useCheckbox("all");
  const no = useCheckbox("noStops");
  const one = useCheckbox("oneStop");
  const two = useCheckbox("twoStops");
  const three = useCheckbox("threeStops");

  return (
    <div className={classes.container}>
      <div className={classes.title}>количество пересадок</div>
      <ConfigProvider
        theme={{
          token: {
            controlInteractiveSize: 25,
            colorPrimary: "#ffffff",
            colorWhite: "#1f04ff",
          },
        }}
      >
        <div className={classes.checkboxes}>
          <Checkbox
            {...all}
            checked={context?.state.filter.all}
            className={classes.checkbox}
          >
            Все
          </Checkbox>
          <Checkbox
            {...no}
            checked={context?.state.filter.noStops}
            className={classes.checkbox}
          >
            Без пересадок
          </Checkbox>
          <Checkbox
            {...one}
            checked={context?.state.filter.oneStop}
            className={classes.checkbox}
          >
            1 пересадка
          </Checkbox>
          <Checkbox
            {...two}
            checked={context?.state.filter.twoStops}
            className={classes.checkbox}
          >
            2 пересадки
          </Checkbox>
          <Checkbox
            {...three}
            checked={context?.state.filter.threeStops}
            className={classes.checkbox}
          >
            3 пересадки
          </Checkbox>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Sidebar;
