import React from "react"
import ContentLoader from "react-content-loader";
import loader_config from "./loader_config";
const PollCardLoader = (props) => (
  <div className="col-sm-6 mblPllsSrvsCard dskPollsCard dskMasonryCard">
    <ContentLoader
     speed={loader_config.speed}
     backgroundColor={loader_config.backgroundColor}
     foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 319"
      height={319}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="194" />
      <rect x="0" y="202" rx="5" ry="5" width="100%" height="38" />
      {/* <rect x="0" y="301" rx="5" ry="5" width="100%" height="38" /> */}
      <rect x="0" y="254" rx="5" ry="5" width="100%" height="38" />
    </ContentLoader>
  </div>
)

export default PollCardLoader;