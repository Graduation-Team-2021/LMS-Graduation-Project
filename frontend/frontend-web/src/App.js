import { connect } from "react-redux";
import * as actionFunctions from './store/actions/userDataActions'
function App(props) {
  console.log(props);
  const userData = props.userAuthReducer;
  const userDataView = Object.keys(userData).map((e,i) => <li key={i}>{e}:{userData[e]}</li>)
  console.log(userData);
  return (
    <div> 
      <ul>
        {userDataView}
      </ul>
      <button onClick={this.onSignIn} >Sign In</button>
      <button>Sign In</button>

    </div>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: () => dispatch(actionFunctions.sign_in()),
    onSignOut: () => dispatch(actionFunctions.sign_out()),
    onSetTocken: (newToken) => dispatch(actionFunctions.setToken(newToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
