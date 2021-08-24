import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const SessionCardLoaderMobile = (props) => (
<div className="col-sm-6  mblSessionCard dskMasonryCard cmecard_session_block">
<ContentLoader
      speed={loader_config.speed}
      backgroundColor={loader_config.backgroundColor}
      foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 204" 
      height={204}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >
     
    <rect x="0" y="0" rx="4" ry="4" width="544" height="160" /> 
    <rect x="0" y="172" rx="4" ry="4" width="111" height="41" />
    </ContentLoader>
    
  </div>
)

export default SessionCardLoaderMobile;