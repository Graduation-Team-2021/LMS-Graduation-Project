import React from "react";

const Notif = (props) => {
  const Notif  = [];

  props.Notif.forEach(
    (value)=> Notif.push(
      <h2>{value.Name} has Posted in {value.Location}</h2>
    )
  )

  return (
    <React.Fragment>
      {Notif}
    </React.Fragment>
  );
};

export default Notif;
