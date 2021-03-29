import classes from "./CoursesArea.module.css";
import React, { Component } from "react";
import CoursePreview from "../../Components/CoursePreview/CoursePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom';
import {getCourses} from '../../Interface/Interface'

class CoursesArea extends Component {
  state={
    Courses:this.props.Courses
  }
  
  constructor(props) {
    super(props);
    this.CoursesArea = React.createRef();
  }

  loadCourses=()=>{
    getCourses(this.props.Token).then((res)=>{
      this.props.setCourses(res)
      console.log(res)
      this.props.history.push('/Courses')
    });
  }

  render() {
    let courses = [];
    let ids = Array.from(this.state.Courses.keys());

    for (let index = 0; index < ids.length; index++) {
      courses.push(<CoursePreview key={index} Course={this.state.Courses.get(ids[index])} id={ids[index]} />);
    }

    return (
      <div className={classes.CoursesArea}>
        <div style={{
          display: 'flex',
          width: '100%',
          justifyContent: "space-between",
        }}>
          <div className={classes.Title}>Courses You're Taking</div>
          <button className={classes.Join} onClick={
            ()=> {
              this.loadCourses()
            }
          }>See All Courses</button>
        </div>
        <div className={classes.SwipeList}>
          <div
            className={classes.Right}
            onClick={() => {
              this.CoursesArea.current.scrollLeft -= 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="4x" />
          </div>
          <div className={classes.InnerSwipeList} ref={this.CoursesArea}>
            {courses}
          </div>
          <div
            className={classes.Left}
            onClick={() => {
              this.CoursesArea.current.scrollLeft += 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} size="4x" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CoursesArea);
