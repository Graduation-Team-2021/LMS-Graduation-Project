import React , {Component} from 'react';
//import  from ''
import './Mark_edit.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';


class MarkEdit extends Component {

    state = {
        users : [],
         marks : [] ,
        totalmark : "50"
    }

    

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((result) => {
            console.log(result);
        this.setState({
            users : result.data
        })
        console.log(this.state.users)
    }).catch((err) => {
        
    });
    }

    mark=(event)=>{
        // this.setState({
        //     // marks : event.target.value
        // })
        // // console.log(this.state.marks);
        console.log('hello mf');
        if(event.target.value > 50 || event.target.value < 0 ){
            console.log("enter a sutuble nim ");
        }else{
            this.setState({
                marks : event.target.value
            })
            console.log("askdjhksadj")
            // console.log({marks})
        }
    }

    sumbit=()=>{
        // axios.patch('https://jsonplaceholder.typicode.com/users',)
        console.log('hello mf')
    }
    render(){
        return(
            <div>
                <Router>
                </Router>
                <div className="main">
                <p> COURSE NAME</p>
                <table>
                <tr>
                    <th>Name</th>
                    <th>email</th>
                    <th>id</th>
                    <th>Mark</th>
                </tr>
                {this.state.users.map(user => { return(
                <tr>    
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.username}
                    </td>
                    <td>
                        {user.id}
                    </td>
                    <td>
                        <input type="number"  onChange={this.mark}/>
                        <pre> out of {this.state.totalmark} </pre>
                        {/*<button onClick={this.sumbit}> sumbut the mark</button>*/}
                    </td> 
                </tr>
                )})}
                </table>
                <button className="finish" onClick={this.sumbit}> sumbut the marks</button>
                </div>
            </div>
        )
    }

}



export default MarkEdit;