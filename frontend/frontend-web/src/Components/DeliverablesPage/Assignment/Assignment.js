import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import cls from "./Assignment.module.css";
import { getDelivByID } from "../../../Interface/Interface";
import { mapStateToProps, mapDispatchToProps } from "../../../store/reduxMaps";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import classes from "./Assignment.module.css";
import Card from "../../Card/Card";
import arrow from "../../../assets/arrow.gif";
import ImageHolder from "../../ImageHolder/ImageHolder";
import Thumbnails from "./Thumbnails/Thumbnails";
import Input from "../../NormalTextField/NormalTextField";

function Page(props) {
  const ele = props.location.state.data;

  const gid = props.group_id;

  const [grade, setGrade] = useState(0);

  const [group, setGroup] = useState([]);

  useEffect(() => {
    //TODO: Load Submitted Files By Michel
    console.log(ele);
    getDelivByID(ele.id, props.userData.Token, gid).then((res) => {
      /* if(ele.number>1&&res.group_id===null){
        //TODO: Get all Groups
      } */
    });
  }, [ele, ele.id, gid, props.userData.Token]);

  const Submit = () => {
    //TODO: Submit Assignment by Michel
    console.log("Submitted");
  };

  const changeGrade = (e) => {
    setGrade(e.target.value);
  };

  const [selfile, setFile] = useState([]);
  const onFileChange = (e) => {
    setFile([...selfile, e[0]]);
  };

  const SetGroup = () => {
    //ToDO: Set group
  };

  const remove = (index) => {
    console.log(`Removed file number ${index}`);
    const temp = [...selfile];
    temp.splice(index, 1);
    setFile(temp);
  };
  return (
    <div className={cls.page}>
      <div className={cls.content}>
        <h1>
          {" "}
          This is "{ele.name}" {ele.type} from "{ele.course}" course
          {gid ? `, Submitted by ${gid}` : ""}
        </h1>
        <span
          style={{
            fontSize: "14pt",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Description: {ele.description}
          {gid ? (
            <Input
              value={grade}
              type="number"
              Name="Grade"
              onChange={changeGrade}
            />
          ) : null}
          {/*<span className={classes.Group_Select}>
               <Input type="select" Name="Group" DataList onSelect value /> 
              <button className={cls.button} onClick={SetGroup}>
                Choose Group
              </button>
            </span>*/}
        </span>
        <span className={classes.Holder}>
          <Card shadow className={classes.Input}>
            <div>
              {selfile.length === 0 ? null : (
                <Thumbnails remove={remove} files={selfile} />
              )}
              <Dropzone onDrop={onFileChange}>
                {({ getRootProps, getInputProps }) => (
                  <div className={classes.Handle} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {selfile.length === 0 ? (
                      <ImageHolder className={classes.image} filler={arrow} />
                    ) : null}
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone>
            </div>
          </Card>
        </span>
        <button className={cls.button} onClick={Submit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
