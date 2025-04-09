import classes from "./Sorter.module.scss";
import { Radio } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import { useContext } from "react";
import { MyContext } from "../../hooks/MyContextProvider.tsx";

const options: CheckboxGroupProps<string>["options"] = [
  { label: "САМЫЙ ДЕШЕВЫЙ", value: "cheapest" },
  { label: "САМЫЙ БЫСТРЫЙ", value: "fastest" },
  { label: "ОПТИМАЛЬНЫЙ", value: "optimal", disabled: true },
];

const Sorter = () => {
  const context = useContext(MyContext);

  return (
    <div className={classes.radiogroup}>
      <Radio.Group
        onChange={(e) => {
          context?.setState({ ...context.state, sorter: e.target.value });
        }}
        className={classes.radio}
        block
        options={options}
        defaultValue="cheapest"
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
};

export default Sorter;
