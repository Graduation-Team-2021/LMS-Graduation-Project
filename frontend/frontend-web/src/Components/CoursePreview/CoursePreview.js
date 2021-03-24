import React from 'react';
import Card from '../Card/Card'
import filler from '../../assets/Filler.png'
import classes from './CoursePreview.module.css'
import ImageHolder from '../ImageHolder/ImageHolder';
import {withRouter} from 'react-router-dom'
 
const CoursePreview = (props) => {
    return (
        <div className={classes.holder} onClick={
          ()=>{
            props.history.push(`/Course/1/true`)
          }
        }>
          <Card shadow>
            <div className={classes.CourseTitle}>Course Name</div>
            <div className={classes.CourseDes}>
              Describe the contents of the course
            </div>
            <ImageHolder filler={filler}/>
          </Card>
        </div>
    );
}
 
export default withRouter(CoursePreview)