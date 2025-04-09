import { useMyContext } from "./useMyContext.ts";
import { ChangeEvent } from "react";

export default function useCheckbox(type: string) {
  const { state, setState } = useMyContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "all") {
      setState({
        ...state,
        filter: {
          all: e.target.checked,
          noStops: e.target.checked,
          oneStop: e.target.checked,
          twoStops: e.target.checked,
          threeStops: e.target.checked,
        },
      });
    }
    if (type !== "all") {
      setState({
        ...state,
        filter: { ...state.filter, [type]: e.target.checked },
      });
    }
    if (type !== "all" && state.filter.all) {
      setState({
        ...state,
        filter: {
          ...state.filter,
          [type]: e.target.checked,
          all: false,
        },
      });
    }
  };

  return { onChange };
}
