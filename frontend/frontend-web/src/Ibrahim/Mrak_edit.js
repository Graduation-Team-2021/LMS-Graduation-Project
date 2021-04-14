import React, { Component } from "react";
//import  from ''
import "./Mark_edit.css";
import axios from "axios";

class MarkEdit extends Component {
  state = {
    users: [],
    marks: [],
    totalmark: "50",
  };

  componentDidMount() {
    axios
      .get("/course/CS88/students")
      .then((result) => {
        console.log(result);
        this.setState({
          users: result.data,
        });
        console.log(this.state.users);
      })
      .catch((err) => {});
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
                  <td>{user.username}</td>
                  <td>{user.id}</td>
                  <td>
                    <input type="number" onChange={this.mark} />
                    <pre> out of 50 </pre>
                  </td>
                  <td>
                    <input type="number" onChange={this.mark} />
                    <pre> out of 50 </pre>
                  </td>
                  <td>
                    <input type="number" onChange={this.mark} />
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
