import * as userDataActionFunctions from './actions/userDataActions'
import * as currentCoursesActionFunctions from './actions/currentCoursesActions'
import * as currentGroupsActionFunctions from './actions/currentGroupsActions'
import * as recentEventActionFunctions from './actions/recentEventActions'
import * as finishedCoursesActionFunctions from './actions/finishedCoursesActions'


export const mapStateToProps = (state) => {
    return {
      userData: state.userDataReducer,
      currentCourses:state.currentCoursesReducer,
      finishedCourses:state.finishedCoursesReducer,
      recentEvents:state.recentEventsReducer,
      currentGroups:state.currentGroupsReducer,
    };
  };
  
export const mapDispatchToProps = (dispatch) => {
    return {
      userDataActions: {
        onSetToken: (newToken) => dispatch(userDataActionFunctions.setToken(newToken)),
        tokenError: () => dispatch(userDataActionFunctions.setToken(null)),
        onSetName: (newName) => dispatch(userDataActionFunctions.setName(newName)),
        onSetId: (newId) => dispatch(userDataActionFunctions.setID(newId)),
        onSetRole: (newRole) => dispatch(userDataActionFunctions.setRole(newRole)),
      },
      currentCoursesActions:{
        onSetCurrentCourses: (newCourses) =>dispatch(currentCoursesActionFunctions.setRecentEvent(newCourses))
      },
      currentGroupsActions: {
        onSetCurrentGroups:(newGroups)=> dispatch(currentGroupsActionFunctions.setCurrentGroups(newGroups))
      },
      recentEventsActions:{
        onSetRecentEvents:(newEvents)=> dispatch(recentEventActionFunctions.setRecentEvent(newEvents))
      },
      finishedCoursesActions:{
        onSetFinishedCourses : (newCourses) => dispatch(finishedCoursesActionFunctions.setFinishedCourses(newCourses))
      }
    };
  };