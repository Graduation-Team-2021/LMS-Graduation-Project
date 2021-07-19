import React, { Component } from "react";
import classes from "./CourseListItem.module.css";
import CourseItemContent from "./CourseItemContent/CourseItemContent";
class CourseListItem extends Component {
  render() {
    const testImage = this.props.CoursePicture;
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
          <img src={testImage} alt="tst" className={classes.CourseImage} />
          <div className={classes.CourseItemContent}>
            <CourseItemContent
              CourseName={this.props.Title}
            />
          </div>
        </div>
        {selected?<div className={classes.Tringle}></div>:null}
      </div>
    );
  }
}

export default CourseListItem;
