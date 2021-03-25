import React,{useState} from "react";
import Card from "../../Components/Card/Card";
import classes from './Post.module.css'


const Post = (props) => {
  
  const [likeButtonColor,setLikeButtonColor] = useState(classes.whiteButton);
  const [postComments,setPostComments] = useState([]);
  const [currentTypingComment,setCurrentTypingComment] = useState("");
  let onTypingComment = (event) =>{
    setCurrentTypingComment(event.target.value);
  }
  const commentPressHandler  = () =>{
    if(currentTypingComment===""){
      console.log("empty comment")
      alert("this is an empty comment")
      return;
    }
    setPostComments([...postComments,currentTypingComment]);
    //FIXME: The first Comment is always empty due to some dark magic
    console.log(postComments)
    setCurrentTypingComment("")
  }

  const likePressHandler = () => {
    if(likeButtonColor === classes.whiteButton){
      setLikeButtonColor(classes.blackButton)
    }
    else if(likeButtonColor === classes.blackButton){
      setLikeButtonColor(classes.whiteButton)
    }
    // TODO: set liked in the database (send the request)
  };

  let comments = postComments.map((e,i)=><li style={{
    border:"1px solid black",
        padding:"10px",
        margin:"10px 10px 10px 0",
        fontFamily:"cursive"
  }}key={i} >{e} </li>)
  //  TODO : set comments from database

  return (
    <Card
      shadow
      style={{
        position: "relative",
        margin: "10% 0 0 0",
        width: "100%",
        padding: "2% 2%",
      }}
    >
      <h2>{props.Title}</h2>
      <p>{props.Content}</p>
      <div>
        <button
          onClick={likePressHandler}
          style={{
            width: "45%",
          }}
          className={likeButtonColor}
        >
          <i class="fas fa-thumbs-up">like</i>
        </button>
        <button
          onClick ={commentPressHandler}
          style={{
            width: "45%",
          }}
        >
          comment
        </button>
      </div>
      <textarea
        name="comment"
        style={{
          overflow: "auto",
          resize: "both",
          width: "70%",
          height: "50px",
          marginLeft: "40px",
        }}
        placeholder="enter your comment"
        onChange= {onTypingComment}
        value ={currentTypingComment}
      ></textarea>
      <ul style={{
        listStyleType:'none',
        textAlign:"left",
      }}>
        {comments}
      </ul>
    </Card>
  );
};

export default Post;
