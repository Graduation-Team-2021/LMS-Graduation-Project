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
  deleteFile,
  UpdateDelivByID,
} from "../../../Interface/Interface";
import FileSaver from "file-saver";
import { useFilePicker } from "react-sage";
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

  const [current, setCurrent] = useState(null);

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
    if (!gid) {
      const selfile2 = selfile.filter(value=>value.delivers_id===null)
      if (selfile2.length!==0) {
        setLoading(true);
        SubmitDelivByID(
          props.userData.Token,
          {
            deliverable_id: ele.id,
            delives: selfile2.map((value) => ({
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
        alert("No New Files Are Added")
        setShow(false)
      }
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

  const download = (index) => {
    downloadD(selfile[index].delivers_id).then((res) => {
      //let file = new File([res], selfile[index].name, {type:selfile[index].type});
      FileSaver.saveAs(res, selfile[index].name);
    });
  };
  const [selfile, setFile] = useState([]);
  const onFileChange = (e) => {
    setFile([...selfile, e[0]]);
  };
  const remove = (index) => {
    if (!gid) {
      if (!selfile[index].delivers_id) {
        const temp = [...selfile];
        temp.splice(index, 1);
        setFile(temp);
      } else {
        deleteFile(selfile[index].delivers_id).then((res) => {
          if (res) {
            const temp = [...selfile];
            temp.splice(index, 1);
            setFile(temp);
          }
        });
      }
      setShow(false);
    } else {
      download(index);
    }
  };

  const replace = (index, newFIle) => {
    UpdateDelivByID(
      selfile[index].delivers_id,
      {
        delivers_id: selfile[index].delivers_id,
        file_name: newFIle.name,
        file_type: newFIle.type,
      },
      newFIle
    ).then((res) => {
      if (res) {
        const temp = [...selfile];
        temp[index].name = newFIle.name;
        temp[index].type = newFIle.type;
        setFile(temp);
        setShow(false);
      }
    });
  };

  const { files, onClick, HiddenFileInput } = useFilePicker({
    maxFileSize: 1000,
  })

  const cFile = selfile[current] ? (
    <React.Fragment>
      <p>What do you want to do with {selfile[current].name}?</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="cancel" onClick={() => setShow(false)}>
          Do Nothing
        </Button>
        <Button
          type="cancel"
          onClick={() => {
            setContent("Delete");
          }}
        >
          Remove
        </Button>
        <Button onClick={() => download(current)}>Download</Button>
        <Button type="correct" onClick={() => setContent("Replace")}>
          Replace
        </Button>
      </div>
    </React.Fragment>
  ) : null;

  const cRemove = selfile[current] ? (
    <React.Fragment>
      <p>Are You Sure You Want to Delete {selfile[current].name}?</p>
      <p>You Can't restore it</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => setShow(false)}>Dismiss</Button>
        <Button
          type="cancel"
          onClick={() => {
            remove(current);
          }}
        >
          Remove
        </Button>
      </div>
    </React.Fragment>
  ) : null;

  const cReplace = selfile[current] ? (
    <React.Fragment>
      <p>Please Choose File to replace {selfile[current].name}</p>
      <p>Then Press "Submit" to replace it</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="cancel" onClick={() => setShow(false)}>
          Dismiss
        </Button>
        <Button onClick={onClick}>Select File</Button>
        <HiddenFileInput multiple={false} />
        <Button
          type="correct"
          onClick={() => {
            if (files[0]) {
              replace(current, files[0]);
            } else {
              alert("Choose File First");
            }
          }}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  ) : null;

  const changeGrade = (e) => {
    setGrade(e.target.value);
  };

  const modCont =
    content === "Submit"
      ? cSubmit
      : content === "Group"
      ? cGroup
      : content === "Files"
      ? cFile
      : content === "Delete"
      ? cRemove
      : cReplace;
  console.log(content);
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
          ) : ele.group_id === null ? (
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
              <div>Group Name: {ele.group_name}</div>
            </span>
          )}
        </span>
        <span className={classes.Holder}>
          <Card shadow className={classes.Input}>
            <div>
              {selfile.length === 0 ? null : (
                <Thumbnails
                  remove={(index) => {
                    if (!gid && selfile[index].delivers_id) {
                      setCurrent(index);
                      setContent("Files");
                      setShow(true);
                    } else {
                      remove(index);
                    }
                  }}
                  files={selfile}
                />
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
