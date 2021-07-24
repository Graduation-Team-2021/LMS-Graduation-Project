import React, { Component } from "react";
//import  from ''
import "./Mark_edit.css";
import {
  getCourseStudents,
  setCourseStudent,
  getDeliv,
} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import Button from "../Components/Button/Button";

class MarkEdit extends Component {
  state = {
    users: [],
    marks: [],
    mid: this.props.location.state.mid,
    final: this.props.location.state.final,
    Devisions: [],
  };

  componentDidMount() {
    getDeliv(this.props.match.params.id, this.props.userData.Token).then(
      (res1) => {
        getCourseStudents(this.props.match.params.id).then((res) => {
          const course = res1.map((val) => ({
            name: val["deliverable_name"],
            mark: val["mark"],
            id: val["deliverable_id"],
          }));
          this.setState({
            Devisions: course,
            users: res.map((val) => {
              const delivs = [];
              const student = val.deliv.map((vall) => ({
                [vall.id]: vall.value,
              }));
              course.forEach((valll) => {
                var mark = "";
                if (Object.keys(student).includes(valll.id)) {
                  mark = student[valll.id];
                }
                delivs.push({ id: valll.id, mark: mark });
              });
              return {
                name: val.name,
                id: val.id,
                mid: val.mid,
                final: val.final,
                Deliverables: delivs,
              };
            }),
          });
        });
      }
    );
  }

  mark = (event, id, index) => {
    if (
      event.target.value > this.state.Devisions[index] ||
      event.target.value < 0
    ) {
      console.log("Enter a suitable number ");
    } else {
      const temp = [...this.state.users];
      const user = temp[id];
      user[event.target.name].Deliverables[index] = event.target.value;
      this.setState({
        users: temp,
      });
    }
  };

  mid = (event, id) => {
    if (event.target.value > this.state.mid || event.target.value < 0) {
      console.log("Enter a suitable number ");
    } else {
      const temp = [...this.state.users];
      const user = temp[id];
      user[event.target.name].mid = event.target.value;
      this.setState({
        users: temp,
      });
    }
  };

  final = (event, id) => {
    if (event.target.value > this.state.final || event.target.value < 0) {
      console.log("Enter a suitable number ");
    } else {
      const temp = [...this.state.users];
      const user = temp[id];
      user[event.target.name].final = event.target.value;
      this.setState({
        users: temp,
      });
    }
  };

  sumbit = () => {
    setCourseStudent(this.props.match.params.id, this.state.users);
  };
  render() {
    document.title = "Edit Grades";
    return (
      <div>
        <p>{this.props.location.state.name}</p>
        <div className="main">
          <table className="oo">
            <thead>
              <tr>
                <th>Name</th>
                <th>id</th>
                {this.state.Devisions.map((val, index) => (
                  <th key={index}>{val.name}</th>
                ))}
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
                    {this.state.Devisions.map((value, index) => (
                      <td key={index}>
                        <input
                          type="number"
                          name={value.name}
                          onChange={(event) => this.mark(event, key, index)}
                          value={user.Deliverables[index].mark}
                        />
                        <pre> out of {value.mark} </pre>
                      </td>
                    ))}
                    <td>
                      <input
                        type="number"
                        name="mid"
                        onChange={(event) => this.mid(event, key)}
                        value={user.mid}
                      />

                      <pre> out of {this.state.mid} </pre>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="final"
                        onChange={(event) => this.final(event, key)}
                        value={user.final}
                      />
                      <pre> out of {this.state.final} </pre>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <Button className="finish" onClick={this.sumbit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkEdit);
