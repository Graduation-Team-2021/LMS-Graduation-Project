import React, { Component } from "react";
//import  from ''
import "./Mark_edit.css";
import axios from "axios";
import { getCourseStudents } from "../Interface/Interface";

class MarkEdit extends Component {
  state = {
    users: [],
    marks: [],
    totalmark: "50",
  };

  componentDidMount() {
    console.log(this.props);
    getCourseStudents(this.props.match.params.id).then(res=>{
      this.setState({
        users : res
      })
      console.log(res)
    })
    
    
  }

  mark = (event) => {
    // this.setState({
    //     // marks : event.target.value
    // })
    // // console.log(this.state.marks);
    if (event.target.value > 50 || event.target.value < 0) {
      console.log("enter a sutuble nim ");
    } else {
      this.setState({
        marks: event.target.value,
      });
      console.log("askdjhksadj");
      // console.log({marks})
    }
  };

  sumbit = () => {
    // axios.patch('https://jsonplaceholder.typicode.com/users',)
  };
  render() {
    return (
      <div >
        <p>{this.props.location.state.name}</p>
        <div className="main">
        <table className="oo">
          <thead>
            <tr>
              <th>Name</th>
              <th>id</th>
              <th>drev</th>
              <th>midterm</th>
              <th>final</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, key) => {
              return (
                <tr key={key}>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>
                    <input type="number" onChange={this.mark}  />
                    <pre> out of 50 </pre>
                  </td>
                  <td>
                    <input type="number" onChange={this.mark}  value = {user.mid}/>
                    <pre> out of 50 </pre>
                  </td>
                  <td>
                    <input type="number" onChange={this.mark} value = {user.final} />
                    <pre> out of 50 </pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
       <div>
      <button className="finish" onClick={this.sumbit}>
      {" "}
      sumbut the marks
    </button>
    </div>
    </div>
    );
  }
}

export default MarkEdit;
