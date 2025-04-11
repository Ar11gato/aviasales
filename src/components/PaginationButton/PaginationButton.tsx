import { Button } from "antd";
import classes from "./PaginationButton.module.scss";

import { useMyContext } from "../../hooks/useMyContext.ts";

const PaginationButton = () => {
  const context = useMyContext();

  return (
    <Button
      className={classes.button}
      type="primary"
      style={{
        height: "52px",
        padding: "8px 16px",
        lineHeight: "3",
      }}
      onClick={() => {
        context?.setState({
          ...context.state,
          pagination: context.state.pagination + 5,
        });
      }}
    >
      ПОКАЗАТЬ ЕЩЕ
    </Button>
  );
};

export default PaginationButton;
