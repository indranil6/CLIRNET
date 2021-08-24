import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const SpqDetailsLoader = (props) => (
  <div className="surveyRight">
    <ContentLoader
      speed={loader_config.speed}
      backgroundColor={loader_config.backgroundColor}
      foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 100%"
      height={700}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >


      <rect x="11" y="37" rx="2" ry="2" width="100%" height="339" />
      <rect x="12" y="2" rx="5" ry="5" width="84" height="27" />
      <rect x="11" y="385" rx="0" ry="0" width="142" height="11" />
      <rect x="11" y="402" rx="0" ry="0" width="100%" height="11" />
    </ContentLoader>
  </div>
)

export default SpqDetailsLoader;