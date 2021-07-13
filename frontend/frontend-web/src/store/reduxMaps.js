import * as userDataActionFunctions from './actions/userDataActions'
import * as currentCoursesActionFunctions from './actions/currentCoursesActions'
import * as currentGroupsActionFunctions from './actions/currentGroupsActions'
import * as recentEventActionFunctions from './actions/recentEventActions'
import * as finishedCoursesActionFunctions from './actions/finishedCoursesActions'
import * as recentUserPostsActionsFunctions from './actions/recentUserPostsActions'
import * as currentMessageActionFunctions from './actions/currentMessageAction'


export const mapStateToProps = (state) => {
    return {
      userData: state.userDataReducer,
      currentCourses:state.currentCoursesReducer,
      finishedCourses:state.finishedCoursesReducer,
      recentEvent:state.recentEventsReducer,
      currentGroups:state.currentGroupsReducer,
      recentUserPosts:state.recentUserPostsReducer,
      currentMessage:state.currentMessageReducer
    };
  };
  
export const mapDispatchToProps = (dispatch) => {
    return {
      userDataActions: {
        onSetToken: (newToken) => dispatch(userDataActionFunctions.setToken(newToken)),
        tokenError: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          dispatch(userDataActionFunctions.setToken(null))
        },
        onSetName: (newName) => dispatch(userDataActionFunctions.setName(newName)),
        onSetId: (newId) => dispatch(userDataActionFunctions.setID(newId)),
        onSetRole: (newRole) => dispatch(userDataActionFunctions.setRole(newRole)),
        onSetPic: (newData) => dispatch(userDataActionFunctions.setPic(newData)),
        onSetData: (newData) => dispatch(userDataActionFunctions.setData(newData)),
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
        onSetFinshedCourses : (newCourses) => dispatch(finishedCoursesActionFunctions.setFinishedCourses(newCourses))
      },
      recentUserPostsActions:{
        onSetRecentUserPosts:(newUserPosts)=> dispatch(recentUserPostsActionsFunctions.setUserRecentPosts(newUserPosts)),
      },
      currentMessageActions:{
        onSetCurrentMessage:(newMessage) => dispatch(currentMessageActionFunctions.setCurrentMessage(newMessage))
      }
    };
  };