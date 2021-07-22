import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import cls from "./Assignment.module.css";
import {
  downloadD,
  getDelivByID,
  getDelivGroup,
  SubmitDelivByID,
  SubmitDgrade,
  SubmitGroup,
} from "../../../Interface/Interface";
import FileSaver, { saveAs } from "file-saver";
import { mapStateToProps, mapDispatchToProps } from "../../../store/reduxMaps";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import classes from "./Assignment.module.css";
import Card from "../../Card/Card";
import arrow from "../../../assets/arrow.gif";
import ImageHolder from "../../ImageHolder/ImageHolder";
import Thumbnails from "./Thumbnails/Thumbnails";
import Input from "../../NormalTextField/NormalTextField";
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import Waiting from "../../Waiting/Waiting";

function Page(props) {
  const ele = props.location.state.data;

  const gid = ele.gid;

  const [grade, setGrade] = useState(0);

  const [group, setGroup] = useState([]);

  const [cg, setCg] = useState([]);

  const [show, setShow] = useState(false);

  const [content, setContent] = useState("Submit");

  const [Loading, setLoading] = useState(false);

  const [done, setDone] = useState(false);

  useEffect(() => {
    getDelivByID(ele.id, props.userData.ID, gid).then((res) => {
      setFile(
        res.map((val) => ({
          name: val.file_name,
          type: val.file_type,
          delivers_id: val.delivers_id,
        }))
      );
      if (ele.group_id === "Not Chosen Yet") {
        //TODO: Get all Groups
        getDelivGroup(ele.id).then((res2) => {
          setGroup(res2.map((val) => ({ name: val.name, value: val.gid })));
        });
      }
    });
  }, [ele, ele.id, gid, props.userData.ID]);

  const Submit = () => {
    setLoading(true);
    if (!gid) {
      SubmitDelivByID(
        props.userData.Token,
        {
          deliverable_id: ele.id,
          delives: selfile.map((value) => ({
            file_name: value.name,
            file_type: value.type,
          })),
        },
        selfile
      ).then((res) => {
        if (res["status_code"] === 200) {
          setLoading(false);
          setDone(true);
        }
      });
    } else {
    }
  };

  const ChooseGroup = () => {
    SubmitGroup(ele.id, {
      user_id: props.userData.ID,
      group_id: cg[0].value,
    }).then((res) => {
      ele.group_id = cg[0].name;
      setShow(false);
    });
  };

  const cSubmit = (
    <Waiting Loading={Loading}>
      {!done ? (
        <React.Fragment>
          <p>Are You sure you want to Submit?</p>
          <p>You can't Edit after Submission</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="cancel" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="correct" onClick={Submit}>
              Confirm
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Uploaded Sucessfully</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="correct" onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
        </React.Fragment>
      )}
    </Waiting>
  );

  const cGroup = cg[0] ? (
    <React.Fragment>
      <p>Are You sure you want to select group {cg[0].name}?</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="cancel" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button type="correct" onClick={ChooseGroup}>
          Confirm
        </Button>
      </div>
    </React.Fragment>
  ) : null;

  const changeGrade = (e) => {
    setGrade(e.target.value);
  };

  const [selfile, setFile] = useState([]);
  const onFileChange = (e) => {
    setFile([...selfile, e[0]]);
  };

  const remove = (index) => {
    if (!gid) {
      const temp = [...selfile];
      temp.splice(index, 1);
      setFile(temp);
    } else {
      downloadD(selfile[index].delivers_id).then((res) => {
        //let file = new File([res], selfile[index].name, {type:selfile[index].type});
        FileSaver.saveAs(res, selfile[index].name);
      });
    }
  };

  const modCont = content === "Submit" ? cSubmit : cGroup;
  return (
    <div className={cls.page}>
      {!gid ? <Modal show={show}>{modCont}</Modal> : null}
      <div className={cls.content}>
        <h1>
          {" "}
          This is "{ele.name}" {ele.type} from "{ele.course}" course
          {gid ? `, Submitted by ${ele.user_name}` : ""}
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
            <span className={classes.Group_Select}>
              <Input
                value={grade}
                type="number"
                Name="Grade"
                onChange={changeGrade}
                flex={1}
              />
              <p style={{ flex: "1" }}>out of {ele.total}</p>
            </span>
          ) : ele.group_id === "Not Chosen Yet" ? (
            <span className={classes.Group_Select}>
              <Input
                type="select"
                Name="Group"
                DataList={group}
                onSelect={(list, item, name) => {
                  setCg([item]);
                }}
                value={cg}
              />
              <button
                className={cls.button}
                onClick={() => {
                  if (cg.length !== 0) {
                    setContent("Group");
                    setShow(true);
                  } else {
                    alert("Select Group First");
                  }
                }}
              >
                Choose Group
              </button>
            </span>
          ) : (
            <span className={classes.Group_Select}>
              <div>Group Name: {ele.group_id}</div>
            </span>
          )}
        </span>
        <span className={classes.Holder}>
          <Card shadow className={classes.Input}>
            <div>
              {selfile.length === 0 ? null : (
                <Thumbnails remove={remove} files={selfile} />
              )}
              {!gid ? (
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
              ) : null}
            </div>
          </Card>
        </span>
        <button
          className={cls.button}
          onClick={() => {
            if (!gid) {
              if (selfile.length !== 0) {
                setContent("Submit");
                setDone(false);
                setShow(true);
              } else {
                alert("Upload Files Before Submitting");
              }
            } else {
              if (grade >= 0 && grade <= ele.total)
                SubmitDgrade(ele.id, gid, grade).then((res) => {
                  console.log(res);
                  alert("Submitted");
                });
              else alert("put proper grade");
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
