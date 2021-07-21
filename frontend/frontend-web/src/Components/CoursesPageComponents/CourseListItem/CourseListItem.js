import React, { Component } from "react";
import classes from "./CourseListItem.module.css";
import CourseItemContent from "./CourseItemContent/CourseItemContent";
import filler from '../../../assets/Filler.png'
class CourseListItem extends Component {
  render() {
    const testImage = this.props.CoursePic;
    let selected = this.props.displayedCourse === this.props.id;
    return (
      <div className={classes.CourseItemListContainer} >
        <div
          className={[
            classes.ItemContainer,
            selected ? classes.selected : "",
          ].join(" ")}
          onClick={() => {
            this.props.getSelected(this.props.id);
          }}
        >
          <img src={testImage||filler} alt="tst" className={classes.CourseImage} />
          <div className={classes.CourseItemContent}>
            <CourseItemContent
              CourseName={this.props.CourseName}
              DoctorName={this.props.DoctorName}
            />
          </div>
        </div>
        {selected?<div className={classes.Tringle}></div>:null}
      </div>
    );
  }
}

export default CourseListItem;
