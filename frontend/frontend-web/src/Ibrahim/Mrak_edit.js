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
      .get("https://jsonplaceholder.typicode.com/users")
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
      <div className="main">
        <p>{this.props.location.state.name}</p>
        <table className="oo">
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>id</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, key) => {
              return (
                <tr key={key}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.id}</td>
                  <td>
                    <input type="number" onChange={this.mark} />
                    <pre> out of 50 </pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="finish" onClick={this.sumbit}>
          {" "}
          sumbut the marks
        </button>
      </div>
    );
  }
}

export default MarkEdit;
