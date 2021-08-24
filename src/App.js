import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Loader from "react-loader-spinner";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/common.css";
import "./css/loginRegister.css";
import "./css/style.css";
import "./css/responsive.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize("UA-155988280-1");
ReactGA.pageview(window.location.pathname + window.location.search);

import Loadable from "react-loadable";

const LoadingComponent = () => (
  <div className="loadScr">
    <Loader
      className="loader_cmn"
      type="TailSpin"
      color="#355ed3"
      height={60}
      width={60}
      visible={true}
    />
  </div>
);

const Login = Loadable({
  loader: () => import("./screens/login/Login"),
  loading: LoadingComponent,
});

const Verify = Loadable({
  loader: () => import("./screens/login/Verify"),
  loading: LoadingComponent,
});

const Share = Loadable({
  loader: () => import("./screens/login/Share"),
  loading: LoadingComponent,
});

const Registrationpartone = Loadable({
  loader: () => import("./screens/login/Registrationpartone"),
  loading: LoadingComponent,
});
const Registrationparttwo = Loadable({
  loader: () => import("./screens/login/Registrationparttwo"),
  loading: LoadingComponent,
});
const RegisterWithEmail = Loadable({
  loader: () => import("./screens/login/RegisterWithEmail.func"),
  loading: LoadingComponent,
});
const Dashboard = Loadable({
  loader: () => import("./screens/mainscreens/Dashboard"),
  loading: LoadingComponent,
});
const DashboardStatic = Loadable({
  loader: () => import("./screens/mainscreens/DashboardStatic"),
  loading: LoadingComponent,
});
const Sessions = Loadable({
  loader: () => import("./screens/mainscreens/Sessions"),
  loading: LoadingComponent,
});
const Askquestion = Loadable({
  loader: () => import("./screens/mainscreens/Askquestion"),
  loading: LoadingComponent,
});
const Feeds = Loadable({
  loader: () => import("./screens/mainscreens/Feeds"),
  loading: LoadingComponent,
});

const SpqCompletedQuestionReview = Loadable({
  loader: () => import("./screens/mainscreens/SpqCompletedQuestionReview"),
  loading: LoadingComponent,
});
const SpqListPending = Loadable({
  loader: () => import("./screens/mainscreens/SpqListPending"),
  loading: LoadingComponent,
});
const SpqQuestionPending = Loadable({
  loader: () => import("./screens/mainscreens/SpqQuestionPending"),
  loading: LoadingComponent,
});
const SpqDetailsPending = Loadable({
  loader: () => import("./screens/mainscreens/SpqDetailsPending"),
  loading: LoadingComponent,
});
const SpqDetailsRelated = Loadable({
  loader: () => import("./screens/mainscreens/SpqDetailsRelated"),
  loading: LoadingComponent,
});
const SpqCompletedDetails = Loadable({
  loader: () => import("./screens/mainscreens/SpqCompletedDetails"),
  loading: LoadingComponent,
});
const SpqSubmitSuccessful = Loadable({
  loader: () => import("./screens/mainscreens/SpqSubmitSuccessful"),
  loading: LoadingComponent,
});
const SpqCompletedList = Loadable({
  loader: () => import("./screens/mainscreens/SpqCompletedList"),
  loading: LoadingComponent,
});
const PollDetails = Loadable({
  loader: () => import("./screens/mainscreens/PollDetails"),
  loading: LoadingComponent,
});
const SpqDetails = Loadable({
  loader: () => import("./screens/mainscreens/SpqDetails"),
  loading: LoadingComponent,
});
const SpqQuestionReview = Loadable({
  loader: () => import("./screens/mainscreens/SpqQuestionReview"),
  loading: LoadingComponent,
});
const SpqQuestion = Loadable({
  loader: () => import("./screens/mainscreens/SpqQuestion"),
  loading: LoadingComponent,
});
const Spq = Loadable({
  loader: () => import("./screens/mainscreens/Spq"),
  loading: LoadingComponent,
});
const TeleMed = Loadable({
  loader: () => import("./screens/mainscreens/TeleMed"),
  loading: LoadingComponent,
});
const Feeddetail = Loadable({
  loader: () => import("./screens/mainscreens/Feeddetail"),
  loading: LoadingComponent,
});

const Autologin = Loadable({
  loader: () => import("./screens/login/Autologin"),
  loading: LoadingComponent,
});
const Feeddetailrelated = Loadable({
  loader: () => import("./screens/mainscreens/Feeddetailrelated"),
  loading: LoadingComponent,
});
const Vault = Loadable({
  loader: () => import("./screens/mainscreens/Vault"),
  loading: LoadingComponent,
});
const SearchResult = Loadable({
  loader: () => import("./screens/mainscreens/SearchResult"),
  loading: LoadingComponent,
});
const Sessionwithpeer = Loadable({
  loader: () => import("./screens/mainscreens/Sessionwithpeer"),
  loading: LoadingComponent,
});
const Peer = Loadable({
  loader: () => import("./screens/mainscreens/Peer"),
  loading: LoadingComponent,
});
const Deals = Loadable({
  loader: () => import("./screens/mainscreens/Deals"),
  loading: LoadingComponent,
});
const UserPoint = Loadable({
  loader: () => import("./screens/mainscreens/UserPoint"),
  loading: LoadingComponent,
});
const Autoauth = Loadable({
  loader: () => import("./screens/mainscreens/Autoauth"),
  loading: LoadingComponent,
});
const LiveSessionDetails = Loadable({
  loader: () => import("./screens/mainscreens/LiveSessionDetails"),
  loading: LoadingComponent,
});
const ArchivedVideo = Loadable({
  loader: () => import("./screens/mainscreens/ArchivedVideo"),
  loading: LoadingComponent,
});
const ArchivedVideoRelated = Loadable({
  loader: () => import("./screens/mainscreens/ArchivedVideoRelated"),
  loading: LoadingComponent,
});
const DashboardDesktop = Loadable({
  loader: () => import("./screens/mainscreens/DashboardDesktop"),
  loading: LoadingComponent,
});
const DashboardDesktopFunc = Loadable({
  loader: () => import("./screens/mainscreens/DashboardDesktop.func"),
  loading: LoadingComponent,
});
const DashboardMobile = Loadable({
  loader: () => import("./screens/mainscreens/DashboardMobile"),
  loading: LoadingComponent,
});
const GrandRounds = Loadable({
  loader: () => import("./screens/mainscreens/GrandRounds"),
  loading: LoadingComponent,
});
const GrandRoundsMobile = Loadable({
  loader: () => import("./screens/mainscreens/GrandRoundsMobile"),
  loading: LoadingComponent,
});
const GrandRoundsDesktop = Loadable({
  loader: () => import("./screens/mainscreens/GrandRoundsDesktop"),
  loading: LoadingComponent,
});
const GrandRoundlisting = Loadable({
  loader: () => import("./screens/mainscreens/GrandRoundlisting"),
  loading: LoadingComponent,
});
const CphDesktop = Loadable({
  loader: () => import("./screens/mainscreens/CphDesktop"),
  loading: LoadingComponent,
});
const CphMobile = Loadable({
  loader: () => import("./screens/mainscreens/CphMobile"),
  loading: LoadingComponent,
});
const CphMobileApp = Loadable({
  loader: () => import("./screens/mainscreens/CphMobileApp"),
  loading: LoadingComponent,
});
const PageNotFound = Loadable({
  loader: () => import("./screens/Error_screen/PageNotFound.jsx"),
  loading: LoadingComponent,
});
const Unavailable = Loadable({
  loader: () => import("./screens/Error_screen/Unavailable.jsx"),
  loading: LoadingComponent,
});
const DiscussAndRefer = Loadable({
  loader: () =>
    import("./screens/Hospital/hospital_desktop/DiscussAndRefer.jsx"),
  loading: LoadingComponent,
});
const HospitalProfile = Loadable({
  loader: () =>
    import("./screens/Hospital/hospital_desktop/HospitalProfile.jsx"),
  loading: LoadingComponent,
});
const Activities = Loadable({
  loader: () => import("./screens/Hospital/hospital_desktop/Activities.jsx"),
  loading: LoadingComponent,
});
const ReferForm = Loadable({
  loader: () => import("./screens/Hospital/hospital_desktop/ReferForm.jsx"),
  loading: LoadingComponent,
});
const DiscussForm = Loadable({
  loader: () => import("./screens/Hospital/hospital_desktop/DiscussForm.jsx"),
  loading: LoadingComponent,
});
const ReferThankYou = Loadable({
  loader: () => import("./screens/Hospital/hospital_desktop/ReferThankYou.jsx"),
  loading: LoadingComponent,
});
const ReInitiateRefer = Loadable({
  loader: () =>
    import("./screens/Hospital/hospital_desktop/ReInitiateRefer.jsx"),
  loading: LoadingComponent,
});
const AutoauthDirect = Loadable({
  loader: () => import("./screens/mainscreens/AutoauthDirect"),
  loading: LoadingComponent,
});

var Profile = Loadable({
  loader: () => import("./screens/mainscreens/Profile"),
  loading: LoadingComponent,
});

// const FeedDemo = Loadable({
//   loader:()=>import('./screens/mainscreens/FeedDemo'),
//   loading:LoadingComponent
// })

const CustomVideoPlayer = Loadable({
  loader: () => import("./screens/Hospital/CustomVideoPlayer.jsx"),
  loading: LoadingComponent,
});

const VideoPlayer = Loadable({
  loader: () => import("./screens/session/VideoPlayer.jsx"),
  loading: LoadingComponent,
});

const LiveSession = Loadable({
  loader: () => import("./screens/session/LiveSession.jsx"),
  loading: LoadingComponent,
});

const SessionWaitingRoom = Loadable({
  loader: () => import("./screens/session/SessionWaitingRoom.jsx"),
  loading: LoadingComponent,
});

var AutoauthContinue = Loadable({
  loader: () => import("./screens/mainscreens/AutoauthContinue"),
  loading: LoadingComponent,
});

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/otpverify" component={Verify} />
          <Route
            path="/Share/:type/:id/:source?/:referal_code?"
            component={Share}
          />
          <Route path="/registrationpartone" component={Registrationpartone} />
          <Route path="/Registrationparttwo" component={Registrationparttwo} />
          {/* <Route path="/Registerwithemail" component={Registerwithemail} /> */}
          <Route path="/Registerwithemail" component={RegisterWithEmail} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/DashboardStatic" component={DashboardStatic} />
          <Route path="/Sessions/:is_reserved?" component={Sessions} />
          <Route path="/Reservesession/:id" component={Askquestion} />
          <Route path="/Feeds" exact component={Feeds} />
          <Route path="/Feeddetail/:id" component={Feeddetail} />
          <Route path="/Feeddetailrelated/:id" component={Feeddetailrelated} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Vault" component={Vault} />
          <Route
            path="/Autologin/:id/:redirect_name?/:redirect_page_id?"
            component={Autologin}
          />
          <Route path="/SearchResult" component={SearchResult} />
          <Route path="/Peer" exact component={Peer} />
          <Route path="/Sessionwithpeer" component={Sessionwithpeer} />
          <Route path="/TeleMed/" component={TeleMed} />
          <Route path="/Spq" component={Spq} />
          <Route path="/SpqDetails/:id" component={SpqDetails} />
          <Route path="/PollDetails/:id" component={PollDetails} />
          <Route path="/SpqQuestion/:id" component={SpqQuestion} />
          <Route
            path="/SpqQuestionPending/:id"
            component={SpqQuestionPending}
          />
          <Route path="/SpqCompletedList/" component={SpqCompletedList} />
          <Route path="/SpqListPending/" component={SpqListPending} />
          <Route path="/UserPoint/" component={UserPoint} />
          <Route path="/Deals" component={Deals} />
          <Route path="/SpqQuestionReview/:id" component={SpqQuestionReview} />
          <Route
            path="/SpqSubmitSuccessful/:id"
            component={SpqSubmitSuccessful}
          />
          <Route
            path="/SpqCompletedDetails/:id"
            component={SpqCompletedDetails}
          />
          <Route path="/SpqDetailsPending/:id" component={SpqDetailsPending} />
          <Route path="/SpqDetailsRelated/:id" component={SpqDetailsRelated} />
          <Route
            path="/AutoauthDirect/:content_type/:content_id/:utm_source/:user_type/:user_id/:temp_token?"
            component={AutoauthDirect}
          />
          <Route
            path="/SpqCompletedQuestionReview/:id"
            component={SpqCompletedQuestionReview}
          />
          <Route
            path="/Autoauth/:content_type/:content_id/:utm_source/:user_type/:user_id/:temp_token?"
            component={Autoauth}
          />

          <Route
            path="/AutoauthContinue/:content_type/:content_id/:utm_source/:user_type/:user_id/:temp_token?"
            component={AutoauthContinue}
          />

          <Route
            path="/LiveSessionDetails/:id"
            component={LiveSessionDetails}
          />
          <Route path="/ArchivedVideo/:id" component={ArchivedVideo} />
          <Route
            path="/ArchivedVideoRelated/:id"
            component={ArchivedVideoRelated}
          />
          {/* <Route path="/DashboardDesktop" component={DashboardDesktop} /> */}
          <Route path="/DashboardDesktop" component={DashboardDesktopFunc} />
          <Route path="/DashboardMobile" component={DashboardMobile} />

          <Route
            path="/GrandRoundsDesktop/:id"
            component={GrandRoundsDesktop}
          />
          <Route path="/GrandRoundsMobile/:id" component={GrandRoundsMobile} />
          <Route path="/GrandRoundlisting" component={GrandRoundlisting} />
          <Route path="/GrandRounds/:id" component={GrandRounds} />

          <Route path="/CphDesktop/" component={CphDesktop} />
          <Route path="/CphMobile/" component={CphMobile} />
          <Route path="/CphMobileApp/" component={CphMobileApp} />

          <Route path="/DiscussAndRefer" component={DiscussAndRefer} />
          <Route path="/HospitalProfile/:id" component={HospitalProfile} />
          <Route path="/Activities/:type?" component={Activities} />
          <Route path="/DiscussForm/:id" component={DiscussForm} />
          <Route path="/ReferForm/:id" component={ReferForm} />
          <Route path="/ReferThankYou/:id" component={ReferThankYou} />
          <Route path="/ReInitiateRefer/:id" component={ReInitiateRefer} />
          <Route path="/Unavailable/:continue" component={Unavailable} />

          {/* <Route path="/FeedDemo" component={FeedDemo}/>  */}
          <Route path="/CustomVideoPlayer" component={CustomVideoPlayer} />
          <Route path="/VideoPlayer" component={VideoPlayer} />
          <Route path="/LiveSession/:id" component={LiveSession} />
          <Route
            path="/SessionWaitingRoom/:id"
            component={SessionWaitingRoom}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </HashRouter>
  );
}
export default App;
