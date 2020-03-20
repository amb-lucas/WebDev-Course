import React from "react";

import Card from "./Card";
import emojis from "../emojipedia";

const CardList = () => {
  return (
    <dl className="dictionary">
      {emojis.map(props => {
        return (
          <Card
            key={props.id}
            emoji={props.emoji}
            name={props.name}
            description={props.meaning}
          />
        );
      })}
    </dl>
  );
};

export default CardList;
