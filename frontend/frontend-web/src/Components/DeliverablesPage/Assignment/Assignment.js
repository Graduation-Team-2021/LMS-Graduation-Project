import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import cls from "./Assignment.module.css";
import { getDelivByID } from "../../../Interface/Interface";
import { mapStateToProps, mapDispatchToProps } from "../../../store/reduxMaps";
import { connect } from "react-redux";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function Page(props) {

  useEffect(()=>{
    //TODO: Load Submitted Files By Michel
    getDelivByID(ele.id, props.userData.Token)
  },[ele.id])

  const Submit=()=>{
    //TODO: Submit Assignment by Michel
    console.log("Submitted");
  }

  const ele = props.location.state.data;
  const [comment, setComment] = useState("");
  const [selfile, setFile] = useState(null);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className={cls.page}>
      <button className={cls.button} onClick={() => props.history.goBack()}>
        Go Back...
      </button>
      <div className={cls.content}>
        <h1>
          {" "}
          This is "{ele.name}" {ele.type} from "{ele.course}" course
        </h1>
        <span style={{ fontSize: "14pt" }}>
          Description: {ele.description || description}
        </span>
        <form>
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add a comment..."
          />
          <input type="file" id="file" onChange={onFileChange} />
          <button
            className={cls.button}
            onClick={Submit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
