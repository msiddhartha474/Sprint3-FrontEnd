import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Surveys from './containers/Surveys'
import CreateSurvey from './containers/CreateSurvey'
import AddQuestion from './containers/AddQuestion'
import ViewSurvey from './containers/ViewSurvey'
import ViewRespSurvey from './containers/ViewRespSurvey'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import './App.css';
import RootPage from './containers/RootPage';
import SurveyorActivities from './containers/SurveyorActivities';
import SurveyorLogin from './containers/SurveyorLogin';
import SurveyorRegister from './containers/SurveyorRegister';
import RespondentActivities from './containers/RespondentActivities';
import RespondentLogin from './containers/RespondentLogin';
import RespondentRegister from './containers/RespondentRegister';
import RespondentDashboard from './containers/RespondentDashboard';
import ViewQuestion from './containers/ViewQuestion';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      pathname: '',
    };

    this.notifyPathname = this.notifyPathname.bind(this);
  }

  notifyPathname(pathname){
      this.setState({
        pathname : pathname,
      });
  }

  render(){
    return(
      <Router>
          <div className="App">
              <Switch>

                  <Route  path = "/"
                          exact
                          component = {() => <RootPage />}
                  />
                 
                  <Route  path = "/surveyorActivity"
                          exact
                          component = {() => <SurveyorActivities />}
                  />
                    <Route  path = "/SurveyorLogin"
                          exact
                          component = {() => <SurveyorLogin />}
                  />
                    <Route  path = "/SurveyorRegister"
                          exact
                          component = {() => <SurveyorRegister />}
                  />
                   <Route  path = "/respondentActivity"
                          exact
                          component = {() => <RespondentActivities />}
                  />
                    <Route  path = "/respondentLogin"
                          exact
                          component = {() => <RespondentLogin />}
                  />
                    <Route  path = "/respondentRegister"
                          exact
                          component = {() => <RespondentRegister />}
                  />
                   <Route  path = "/SurveyorDashboard/:id"
                          exact
                          component = {() => <Surveys />}
                  />
                  <Route  path = "/RespondentDashboard/:id"
                          exact
                          component = {() => <RespondentDashboard />}
                  />
                  <Route  path = "/createSurvey"
                          exact
                          component = {() => <CreateSurvey />}
                  />
                  <Route  path = "/edit/:id"
                          exact
                          component = {(props) => <CreateSurvey { ...props} />}
                  />
                  <Route  path = "/viewSurvey/:id"
                          exact
                          component = {(props) => <ViewSurvey { ...props} />}
                  />
                  <Route  path = "/viewQuestion/:id"
                          exact
                          component = {(props) => <ViewQuestion { ...props} />}
                  />
                  <Route  path = "/viewRespSurvey/:id"
                          exact
                          component = {(props) => <ViewRespSurvey { ...props} />}
                  />
                   <Route  path = "/addQuestion/:id"
                          exact
                          component = {(props) => <AddQuestion { ...props} />}
                  />
                  <Route  path = "/editQuestion/:id"
                          exact
                          component = {(props) => <AddQuestion { ...props} />}
                  />
              </Switch>
          </div>
      </Router>
    
    ) 
  }
}

export default App;
