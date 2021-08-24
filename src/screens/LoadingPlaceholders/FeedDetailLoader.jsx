import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const FeedDetailLoader = (props) => (
 
  <ContentLoader
  speed={loader_config.speed}
  backgroundColor={loader_config.backgroundColor}
  foregroundColor={loader_config.foregroundColor}
  viewBox="0 0 100% 500"
  height={500}
  width={"100%"}
  style={{ width: '100%' }}
  {...props}
>
  <rect x="0" y="0" rx="2" ry="2" width="100%" height="500" />
  
  </ContentLoader>
 
)

export default FeedDetailLoader;