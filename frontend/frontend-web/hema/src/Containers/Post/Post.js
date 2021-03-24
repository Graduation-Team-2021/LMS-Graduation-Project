import React from "react";
import Card from "../../Components/Card/Card";
var btn_classs = "whiteButton"
var count = 1;


const Post = (props) => {
  
  const color = () =>{
    if (count===1){
      btn_classs="blackButton";
      count--;
    }else if (count===0){
      btn_classs="whiteButton"
      count++;
    }
  }
  console.log(count)
  return (
    <Card shadow style={{
        position: 'relative',
        margin:"10% 0 0 0",
        width: '100%',
        padding: '2% 2%'
    }}>
      <h2>{props.Title}</h2>
      <p>{props.Content}</p>  
      <div>
      <button onClick={color} style={{
        width : "45%"
      }} className={btn_classs}>
      <i  class="fas fa-thumbs-up">
        like
      </i>
      </button>
      <button onClick style={{
        width : "45%"
      }}>comment</button>
      </div>
      <textarea name="comment" style={{
        overflow:"auto",
        resize:"both",
        width:"70%",
        height:"50px",
        marginLeft:"40px"
      }} placeholder="enter your comment"></textarea>
    </Card>
  );
};

export default Post;
