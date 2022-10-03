import React, { Component } from "react";

class DragonAvatar extends Component {
  render() {
    const { generationId, dragonId, traits } = this.props.dragon;

    // if then dont render any avatar
    if (!dragonId) return <div></div>;
    // else render avatar
    return (
      <div>
        <span>G{generationId}.</span>
        <span>I{dragonId}.</span>
        {traits.map((trait) => trait.traitValue).join(", ")}
      </div>
    );
  }
}

export default DragonAvatar;
