import React from "react";
import { connect } from "react-redux";

import { mapStateToProps, mapDispatchToProps } from "../../../store/reduxMaps";

const Notif = (props) => {
  const Notif  = [];

  props.recentUserPosts.userRecentPosts.forEach(
    (value, index)=> Notif.push(
      <h2 key={index}>{value.Name} has Posted in {value.Location}</h2>
    )
  )

  return (
    <React.Fragment>
      {Notif}
    </React.Fragment>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(Notif);
