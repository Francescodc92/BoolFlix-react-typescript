import { type Movie, type Series } from "../../../types";
import { CardElement } from "./CardElement";
import "./ElementList.css";

type ElementListProps = {
  elements: (Movie | Series)[];
};

export const ElementList = ({ elements }: ElementListProps) => {
  return (
    <div className="list-wrapper">
      {elements.map((element) => (
        <CardElement element={element} key={element.id} />
      ))}
    </div>
  );
};
