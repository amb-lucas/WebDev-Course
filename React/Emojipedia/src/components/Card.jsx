import React from "react";

const Card = props => {
  const { emoji, name, description } = props;

  return (
    <div className="term">
      <dt>
        <span className="emoji" role="img" aria-label="Tense Biceps">
          {emoji}
        </span>
        <span>{name}</span>
      </dt>
      <dd>{description}</dd>
    </div>
  );
};

export default Card;
