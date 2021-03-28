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
            props.history.push(`/Course/${props.id}/true/${props.Course.Post}`)
          }
        }>
          <Card shadow>
            <div className={classes.CourseTitle}>{props.Course.Title}</div>
            <div className={classes.CourseDes}>
             {props.Course.Desc}
            </div>
            <ImageHolder filler={filler}/>
          </Card>
        </div>
    );
}
 
export default withRouter(CoursePreview)
