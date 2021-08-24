import React from 'react';
import './App.css';
// import Login from './screens/login/Login';
// import Verify from './screens/login/Verify';
// import Share from './screens/login/Share';
// import Registrationpartone from './screens/login/Registrationpartone';
// import Registrationparttwo from './screens/login/Registrationparttwo';
// import Registerwithemail from './screens/login/Registerwithemail';
// import Dashboard from './screens/mainscreens/Dashboard';
// import DashboardStatic from './screens/mainscreens/DashboardStatic';
// import Sessions from './screens/mainscreens/Sessions';
// import Askquestion from './screens/mainscreens/Askquestion';
// import Feeds from './screens/mainscreens/Feeds';
// import FeedDemo from './screens/mainscreens/FeedDemo';
// import Autologin from './screens/login/Autologin';
// import Feeddetail from './screens/mainscreens/Feeddetail';
// import TeleMed from './screens/mainscreens/TeleMed';
// import Spq from './screens/mainscreens/Spq';
// import SpqQuestion from './screens/mainscreens/SpqQuestion'; 
// import SpqQuestionReview from './screens/mainscreens/SpqQuestionReview'; 
// import SpqDetails from './screens/mainscreens/SpqDetails';
// import PollDetails from './screens/mainscreens/PollDetails';
// import SpqCompletedList from './screens/mainscreens/SpqCompletedList'; 
// import SpqSubmitSuccessful from './screens/mainscreens/SpqSubmitSuccessful';
// import SpqCompletedDetails from './screens/mainscreens/SpqCompletedDetails';
// import SpqDetailsRelated from './screens/mainscreens/SpqDetailsRelated';
// import SpqDetailsPending from './screens/mainscreens/SpqDetailsPending';  
// import SpqQuestionPending from './screens/mainscreens/SpqQuestionPending';
// import SpqListPending from './screens/mainscreens/SpqListPending';  
// import SpqCompletedQuestionReview from './screens/mainscreens/SpqCompletedQuestionReview';

// import Feeddetailrelated from './screens/mainscreens/Feeddetailrelated';
// import Vault from './screens/mainscreens/Vault';
// import Profile from './screens/mainscreens/Profile';
// import SearchResult from './screens/mainscreens/SearchResult';
// import Sessionwithpeer from './screens/mainscreens/Sessionwithpeer';
// import Peer from './screens/mainscreens/Peer';
// import Deals from './screens/mainscreens/Deals';
// import UserPoint from './screens/mainscreens/UserPoint';
// import Autoauth from './screens/mainscreens/Autoauth'; 
// // import Zoom from './screens/mainscreens/Zoom'; 
// import LiveSessionDetails from './screens/mainscreens/LiveSessionDetails';
// import ArchivedVideo from './screens/mainscreens/ArchivedVideo';
// import ArchivedVideoRelated from './screens/mainscreens/ArchivedVideoRelated';
// import DashboardDesktop from './screens/mainscreens/DashboardDesktop';
// import DashboardMobile from './screens/mainscreens/DashboardMobile';
// import GrandRounds from './screens/mainscreens/GrandRounds';
// // import HeaderDesktop from './screens/mainscreens/HeaderDesktop';
// import GrandRoundsMobile from './screens/mainscreens/GrandRoundsMobile';
// import GrandRoundsDesktop from './screens/mainscreens/GrandRoundsDesktop';
// import GrandRoundlisting from './screens/mainscreens/GrandRoundlisting';

// import CphDesktop from './screens/mainscreens/CphDesktop';
// import CphMobile from './screens/mainscreens/CphMobile';
// import CphMobileApp from './screens/mainscreens/CphMobileApp';


// import PageNotFound from './screens/Error_screen/PageNotFound.jsx';
// import Unavailable from './screens/Error_screen/Unavailable.jsx';
// /*hospital routes*/
// import DiscussAndRefer from './screens/Hospital/hospital_desktop/DiscussAndRefer.jsx';
// import HospitalProfile from './screens/Hospital/hospital_desktop/HospitalProfile.jsx';
// import Activities from './screens/Hospital/hospital_desktop/Activities.jsx';
// import ReferForm from './screens/Hospital/hospital_desktop/ReferForm.jsx'; 
// import DiscussForm from './screens/Hospital/hospital_desktop/DiscussForm.jsx';  
// import ReferThankYou from './screens/Hospital/hospital_desktop/ReferThankYou.jsx';
// import ReInitiateRefer from './screens/Hospital/hospital_desktop/ReInitiateRefer.jsx';
// import AutoauthDirect from './screens/mainscreens/AutoauthDirect';
 
// //video routes
// import CustomVideoPlayer from './screens/Hospital/CustomVideoPlayer.jsx';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './css/common.css';
import './css/loginRegister.css';
import './css/style.css';
import './css/responsive.css';
import { HashRouter,Switch,Route } from 'react-router-dom';
import ReactGA from 'react-ga';



ReactGA.initialize('UA-155988280-1');
ReactGA.pageview(window.location.pathname + window.location.search);

import Loadable  from 'react-loadable'; 

const LoadingComponent = () =><h3>Loading...</h3>

const Login = Loadable({
  loader:()=>import('./screens/login/Login'), 
  loading:LoadingComponent 
}) 


const Verify = Loadable({
  loader:()=>import('./screens/login/Verify'), 
  loading:LoadingComponent   
}) 


const Share = Loadable({
  loader:()=>import('./screens/login/Share'), 
  loading:LoadingComponent 
}) 

const Registrationpartone = Loadable({
  loader:()=>import('./screens/login/Registrationpartone'), 
  loading:LoadingComponent 
}) 
const Registrationparttwo = Loadable({
  loader:()=>import('./screens/login/Registrationparttwo'), 
  loading:LoadingComponent 
}) 
const Registerwithemail = Loadable({
  loader:()=>import('./screens/login/Registerwithemail'), 
  loading:LoadingComponent 
}) 
const Dashboard = Loadable({
  loader:()=>import('./screens/mainscreens/Dashboard'), 
  loading:LoadingComponent 
}) 
const DashboardStatic = Loadable({
  loader:()=>import('./screens/mainscreens/DashboardStatic'), 
  loading:LoadingComponent 
}) 
const Sessions = Loadable({
  loader:()=>import('./screens/mainscreens/Sessions'), 
  loading:LoadingComponent 
}) 
const Askquestion = Loadable({
  loader:()=>import('./screens/mainscreens/Askquestion'), 
  loading:LoadingComponent 
}) 
const Feeds = Loadable({
  loader:()=>import('./screens/mainscreens/Feeds'), 
  loading:LoadingComponent 
}) 

const SpqCompletedQuestionReview = Loadable({
  loader:()=>import('./screens/mainscreens/SpqCompletedQuestionReview'), 
  loading:LoadingComponent 
}) 
const SpqListPending = Loadable({
  loader:()=>import('./screens/mainscreens/SpqListPending'), 
  loading:LoadingComponent 
}) 
const SpqQuestionPending = Loadable({
  loader:()=>import('./screens/mainscreens/SpqQuestionPending'), 
  loading:LoadingComponent 
}) 
const SpqDetailsPending = Loadable({
  loader:()=>import('./screens/mainscreens/SpqDetailsPending'), 
  loading:LoadingComponent 
}) 
const SpqDetailsRelated = Loadable({
  loader:()=>import('./screens/mainscreens/SpqDetailsRelated'), 
  loading:LoadingComponent 
}) 
const SpqCompletedDetails = Loadable({
  loader:()=>import('./screens/mainscreens/SpqCompletedDetails'), 
  loading:LoadingComponent 
}) 
const SpqSubmitSuccessful = Loadable({
  loader:()=>import('./screens/mainscreens/SpqSubmitSuccessful'), 
  loading:LoadingComponent 
}) 
const SpqCompletedList = Loadable({
  loader:()=>import('./screens/mainscreens/SpqCompletedList'), 
  loading:LoadingComponent 
}) 
const PollDetails = Loadable({
  loader:()=>import('./screens/mainscreens/PollDetails'), 
  loading:LoadingComponent 
}) 
const SpqDetails = Loadable({
  loader:()=>import('./screens/mainscreens/SpqDetails'), 
  loading:LoadingComponent 
}) 
const SpqQuestionReview = Loadable({
  loader:()=>import('./screens/mainscreens/SpqQuestionReview'), 
  loading:LoadingComponent 
}) 
const SpqQuestion = Loadable({
  loader:()=>import('./screens/mainscreens/SpqQuestion'), 
  loading:LoadingComponent 
}) 
const Spq = Loadable({
  loader:()=>import('./screens/mainscreens/Spq'), 
  loading:LoadingComponent 
}) 
const TeleMed = Loadable({
  loader:()=>import('./screens/mainscreens/TeleMed'), 
  loading:LoadingComponent 
}) 
const Feeddetail = Loadable({
  loader:()=>import('./screens/mainscreens/Feeddetail'), 
  loading:LoadingComponent 
}) 
const FeedDemo = Loadable({
  loader:()=>import('./screens/mainscreens/FeedDemo'), 
  loading:LoadingComponent 
}) 
const Autologin = Loadable({
  loader:()=>import('./screens/login/Autologin'), 
  loading:LoadingComponent 
}) 
const Feeddetailrelated = Loadable({
  loader:()=>import('./screens/mainscreens/Feeddetailrelated'), 
  loading:LoadingComponent 
}) 
const Vault = Loadable({
  loader:()=>import('./screens/mainscreens/Vault'), 
  loading:LoadingComponent 
}) 
const Profile = Loadable({
  loader:()=>import('./screens/mainscreens/Profile'), 
  loading:LoadingComponent 
})
const SearchResult = Loadable({
  loader:()=>import('./screens/mainscreens/SearchResult'), 
  loading:LoadingComponent 
}) 
const Sessionwithpeer = Loadable({
  loader:()=>import('./screens/mainscreens/Sessionwithpeer'), 
  loading:LoadingComponent 
})
const Peer = Loadable({
  loader:()=>import('./screens/mainscreens/Peer'), 
  loading:LoadingComponent 
})
const Deals = Loadable({
  loader:()=>import('./screens/mainscreens/Deals'), 
  loading:LoadingComponent 
}) 
const UserPoint = Loadable({
  loader:()=>import('./screens/mainscreens/UserPoint'), 
  loading:LoadingComponent 
}) 
const Autoauth = Loadable({
  loader:()=>import('./screens/mainscreens/Autoauth'), 
  loading:LoadingComponent 
})
const LiveSessionDetails = Loadable({
  loader:()=>import('./screens/mainscreens/LiveSessionDetails'), 
  loading:LoadingComponent 
}) 
const ArchivedVideo = Loadable({
  loader:()=>import('./screens/mainscreens/ArchivedVideo'), 
  loading:LoadingComponent 
}) 
const ArchivedVideoRelated = Loadable({
  loader:()=>import('./screens/mainscreens/ArchivedVideoRelated'),  
  loading:LoadingComponent 
}) 
const DashboardDesktop = Loadable({
  loader:()=>import('./screens/mainscreens/DashboardDesktop'), 
  loading:LoadingComponent 
}) 
const DashboardMobile = Loadable({
  loader:()=>import('./screens/mainscreens/DashboardMobile'), 
  loading:LoadingComponent 
}) 
const GrandRounds = Loadable({
  loader:()=>import('./screens/mainscreens/GrandRounds'), 
  loading:LoadingComponent 
})
const GrandRoundsMobile = Loadable({
  loader:()=>import('./screens/mainscreens/GrandRoundsMobile'), 
  loading:LoadingComponent 
}) 
const GrandRoundsDesktop = Loadable({
  loader:()=>import('./screens/mainscreens/GrandRoundsDesktop'), 
  loading:LoadingComponent 
}) 
const GrandRoundlisting = Loadable({
  loader:()=>import('./screens/mainscreens/GrandRoundlisting'), 
  loading:LoadingComponent 
})
const CphDesktop = Loadable({
  loader:()=>import('./screens/mainscreens/CphDesktop'), 
  loading:LoadingComponent 
}) 
const CphMobile = Loadable({
  loader:()=>import('./screens/mainscreens/CphMobile'), 
  loading:LoadingComponent 
}) 
const CphMobileApp = Loadable({
  loader:()=>import('./screens/mainscreens/CphMobileApp'), 
  loading:LoadingComponent 
})
const PageNotFound = Loadable({
  loader:()=>import('./screens/Error_screen/PageNotFound.jsx'), 
  loading:LoadingComponent 
}) 
const Unavailable = Loadable({
  loader:()=>import('./screens/Error_screen/Unavailable.jsx'), 
  loading:LoadingComponent 
}) 
const DiscussAndRefer = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/DiscussAndRefer.jsx'), 
  loading:LoadingComponent 
})
const HospitalProfile = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/HospitalProfile.jsx'), 
  loading:LoadingComponent 
}) 
const Activities = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/Activities.jsx'), 
  loading:LoadingComponent 
}) 
const ReferForm = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/ReferForm.jsx'), 
  loading:LoadingComponent 
})
const DiscussForm = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/DiscussForm.jsx'), 
  loading:LoadingComponent 
}) 
const ReferThankYou = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/ReferThankYou.jsx'), 
  loading:LoadingComponent 
}) 
const ReInitiateRefer = Loadable({
  loader:()=>import('./screens/Hospital/hospital_desktop/ReInitiateRefer.jsx'), 
  loading:LoadingComponent 
})
const AutoauthDirect = Loadable({
  loader:()=>import('./screens/mainscreens/AutoauthDirect'), 
  loading:LoadingComponent 
}) 
const CustomVideoPlayer = Loadable({
  loader:()=>import('./screens/Hospital/CustomVideoPlayer.jsx'), 
  loading:LoadingComponent 
}) 

function App() {
  return (
    <HashRouter>
    <div className="App">
      <Switch>
        
<Route path='/' component={Login} exact /> 
<Route path='/otpverify' component={Verify}/>
<Route path='/Share/:type/:id/:source?/:referal_code?' component={Share} />
<Route path='/registrationpartone' component={Registrationpartone}/>
<Route path='/Registrationparttwo' component={Registrationparttwo}/>
<Route path='/Registerwithemail' component={Registerwithemail}/>
<Route  path='/Dashboard' component={Dashboard}/>
<Route  path='/DashboardStatic' component={DashboardStatic}/>
<Route path='/Sessions/:is_reserved?' component={Sessions}/>  
<Route path='/Reservesession/:id' component={Askquestion}/>
<Route path="/Feeds" exact component={Feeds}/>
<Route path='/Feeddetail/:id' component={Feeddetail}/> 
<Route path='/Feeddetailrelated/:id' component={Feeddetailrelated}/>
<Route path='/Profile' component={Profile}/>
<Route path='/Vault' component={Vault}/>
<Route path='/Autologin/:id/:redirect_name?/:redirect_page_id?' component={Autologin}/>
<Route path='/SearchResult' component={SearchResult}/>
<Route path="/Peer" exact component={Peer}/>
<Route path='/Sessionwithpeer' component={Sessionwithpeer}/>
<Route path="/TeleMed/" component={TeleMed}/>
<Route path="/Spq" component={Spq}/>      
<Route path="/SpqDetails/:id" component={SpqDetails}/>
<Route path="/PollDetails/:id" component={PollDetails}/>
<Route path="/SpqQuestion/:id" component={SpqQuestion}/>
<Route path="/SpqQuestionPending/:id" component={SpqQuestionPending}/>
<Route path="/SpqCompletedList/" component={SpqCompletedList}/>
<Route path="/SpqListPending/" component={SpqListPending}/> 
<Route path="/UserPoint/" component={UserPoint}/>
<Route path="/Deals" component={Deals}/>    
<Route path="/SpqQuestionReview/:id" component={SpqQuestionReview}/>
<Route path="/SpqSubmitSuccessful/:id" component={SpqSubmitSuccessful}/>   
<Route path="/SpqCompletedDetails/:id" component={SpqCompletedDetails}/>  
<Route path="/SpqDetailsPending/:id" component={SpqDetailsPending}/>  
<Route path="/SpqDetailsRelated/:id" component={SpqDetailsRelated}/>
<Route path="/AutoauthDirect/:content_type/:content_id/:utm_source/:user_type/:user_id/:temp_token?" component={AutoauthDirect}/>
<Route path="/SpqCompletedQuestionReview/:id" component={SpqCompletedQuestionReview}/>
<Route path="/Autoauth/:content_type/:content_id/:utm_source/:user_type/:user_id/:temp_token?" component={Autoauth}/>
<Route path="/FeedDemo" component={FeedDemo}/> 
<Route path="/LiveSessionDetails/:id" component={LiveSessionDetails}/>
<Route path="/ArchivedVideo/:id" component={ArchivedVideo}/>  
<Route path="/ArchivedVideoRelated/:id" component={ArchivedVideoRelated}/>  
<Route path="/DashboardDesktop" component={DashboardDesktop}/> 
<Route path="/DashboardMobile" component={DashboardMobile}/>

<Route path="/GrandRoundsDesktop/:id" component={GrandRoundsDesktop}/> 
<Route path="/GrandRoundsMobile/:id" component={GrandRoundsMobile}/> 
<Route path="/GrandRoundlisting" component={GrandRoundlisting}/> 
<Route path="/GrandRounds/:id" component={GrandRounds}/> 

<Route path="/CphDesktop/" component={CphDesktop}/> 
<Route path="/CphMobile/" component={CphMobile}/> 
<Route path="/CphMobileApp/" component={CphMobileApp}/> 

<Route path="/DiscussAndRefer" component={DiscussAndRefer}/>  
<Route path="/HospitalProfile/:id" component={HospitalProfile}/>
<Route path="/Activities/:type?" component={Activities}/>
<Route path="/DiscussForm/:id" component={DiscussForm}/>
<Route path="/ReferForm/:id" component={ReferForm}/>
<Route path="/ReferThankYou/:id" component={ReferThankYou}/> 
<Route path="/ReInitiateRefer/:id" component={ReInitiateRefer}/>
<Route path="/Unavailable/:continue" component={Unavailable}/>


<Route path="/CustomVideoPlayer" component={CustomVideoPlayer}/>
<Route component={PageNotFound}/>
</Switch> 
   </div>
   </HashRouter> 
  );
}

export default App;
