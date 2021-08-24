import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const FeedListLoader = (props) => (
<div className="col-sm-6 mblMedWikiCard dskMasonryCard feedl_listing">
<ContentLoader
      speed={loader_config.speed}
      backgroundColor={loader_config.backgroundColor}
      foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 100"
      height={100}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100" />
    
    </ContentLoader>
    
  </div>
)

export default FeedListLoader;