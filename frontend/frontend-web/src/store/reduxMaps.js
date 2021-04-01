import * as actionFunctions from './actions/userDataActions'

export const mapStateToProps = (state) => {
    return {
      userData: state.userDataReducer,
    };
  };
  
export const mapDispatchToProps = (dispatch) => {
    return {
      userDataActions: {
        onSetToken: (newToken) => dispatch(actionFunctions.setToken(newToken)),
        tokenError: () => dispatch(actionFunctions.setToken(null)),
        onSetName: (newName) => dispatch(actionFunctions.setName(newName)),
        onSetId: (newId) => dispatch(actionFunctions.setID(newId)),
        onSetRole: (newRole) => dispatch(actionFunctions.setRole(newRole)),
      },
    };
  };