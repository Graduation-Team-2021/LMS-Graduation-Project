import React from "react";
import {Button} from "@material-ui/core"


import classes from "./CourseOverview.module.css";

const courseOverview = (props) => {
  let imageTest = props.CoursePicture;

  return (
    <div className={classes.CourseOverview}>
      <img src={imageTest} alt="tst" className={classes.CoursePicture} />
      <h3>{props.CourseName}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id lacus
        suscipit massa lobortis tincidunt sed eget lacus. In hac habitasse
        platea dictumst. Donec vehicula dui ut maximus sollicitudin. Aenean
        finibus, massa eu elementum sagittis, velit lectus tincidunt leo, ac
        volutpat ligula turpis sit amet justo. Mauris nulla mauris, viverra ac
        rhoncus non, laoreet quis nunc. Nam placerat lacinia justo sed euismod.
        Nunc sed accumsan arcu. Cras sed nisl sed leo consectetur placerat.
        Praesent sed aliquam orci. Integer egestas suscipit pulvinar. Aliquam
        consectetur leo sed felis sodales, eget sollicitudin lacus semper.
        Mauris volutpat arcu vitae arcu gravida, quis consectetur lectus
        laoreet. Morbi id molestie eros. Nullam dignissim, magna in accumsan
        feugiat, ipsum odio rhoncus risus, et pretium ex enim ullamcorper
        libero. Nulla scelerisque nisl nec nisi placerat sagittis. Quisque quis
        malesuada mauris. Nulla sed massa at lacus ultricies efficitur in eget
        odio. Integer vulputate nulla risus, vel consequat risus varius eget.
        Duis rutrum ullamcorper porttitor. Nunc risus lacus, congue nec ante in,
        pellentesque fringilla nibh. Pellentesque sollicitudin a sem ac
        imperdiet. Aenean porta nulla vitae nunc placerat, id sollicitudin dolor
        dictum. Nulla non rhoncus tellus. Cras vehicula pellentesque elit.
        Praesent tincidunt dui arcu, at semper quam dictum eget. Nam at justo
        dapibus odio dapibus posuere. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Etiam auctor interdum mauris, at gravida purus blandit
        fringilla. Integer id lorem nec mi rutrum efficitur ut quis nibh. Nulla
        ut lacus purus. Suspendisse potenti. Aliquam maximus, mi id consequat
        aliquam, velit leo imperdiet magna, eget lobortis odio purus et odio.
        Praesent placerat tempor urna, vitae molestie justo imperdiet ut. Sed et
        varius massa. Nulla facilisi. Mauris sodales metus eget lorem lobortis
        dapibus. Vestibulum vestibulum tortor sit amet metus ornare, sit amet
        bibendum orci condimentum. Donec placerat libero vitae quam blandit, nec
        maximus felis dapibus. Nunc sit amet diam ut nisl sollicitudin dapibus
        id a augue. Maecenas imperdiet varius dapibus. Nullam ligula turpis,
        interdum sed consequat a, porttitor non ex. Aliquam erat volutpat.
        Praesent mauris
        
      </p>
      <div className={classes.DocPic}>
        {props.DoctorName}
      </div>
      <div className ={classes.ButtonsRow} >
        <Button variant="contained" color="primary" className={classes.Button} onClick={()=>{alert(`Go to ${props.CourseName}`)}} >
          Go to {props.CourseName}
        </Button>
        <Button color="secondary" className={classes.Button} onClick={props.removeHandler} >
          remove from the stage
        </Button>
      </div>
    </div>
  );
};

export default courseOverview;
