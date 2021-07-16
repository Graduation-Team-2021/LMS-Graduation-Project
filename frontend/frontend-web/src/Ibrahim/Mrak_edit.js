import React, { Component } from "react";
//import  from ''
import "./Mark_edit.css";
import { getCourseStudents, setCourseStudent } from "../Interface/Interface";

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

  mark = (event , id) => {
    // this.setState({
    //     // marks : event.target.value
    // })
    // // console.log(this.state.marks);
    if (event.target.value > 50 || event.target.value < 0) {
      console.log("Enter a suitable number ");
    } else {
      const temp = [...this.state.users]
      const user = temp[id]
      user[event.target.name] = event.target.value
      this.setState({
        users: temp
      });
      console.log("askdjhksadj");
      // console.log({marks})
    }
  };

  sumbit = () => {
    // axios.patch('https://jsonplaceholder.typicode.com/users',)
    setCourseStudent(this.props.match.params.id, this.state.users)
  };
  render() {
    document.title="Edit Grades"
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
                    <input type="number" name='drev' onChange={(event)=>this.mark(event, key)}  />
                    <pre> out of 15 </pre>
                  </td>
                  <td>
                    <input type="number" name='mid' onChange={(event)=>this.mark(event, key)}  value = {user.mid}/>
                    <pre> out of 25 </pre>
                  </td>
                  <td>
                    <input type="number" name='final' onChange={(event)=>this.mark(event, key)} value = {user.final} />
                    <pre> out of 110 </pre>
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
      Submit
    </button>
    </div>
    </div>
    );
  }
}

export default MarkEdit;
