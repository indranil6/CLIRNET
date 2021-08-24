import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const GrandRoundListLoader = (props) => (
<div className="col-lg-4 col-md-6 col-12 dskgrCard dskMasonryCard grCard">
<ContentLoader
   speed={loader_config.speed}
   backgroundColor={loader_config.backgroundColor}
   foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 200"
      height={200}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="200" />
    
    </ContentLoader>
    
  </div>
)

export default GrandRoundListLoader;