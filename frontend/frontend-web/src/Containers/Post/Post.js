import React from "react";
import Card from "../../Components/Card/Card";

const Post = (props) => {
  return (
    <Card shadow style={{
        position: 'relative',
        margin:"10% 0 0 0",
        width: '100%',
        padding: '5% 5%'
    }}>
      <h2>{props.Title}</h2>
      <p>{props.Content}</p>
    </Card>
  );
};

export default Post;
