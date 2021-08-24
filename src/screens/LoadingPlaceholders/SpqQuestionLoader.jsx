import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const SpqQuestionLoader = (props) => (
  <div className="col-md-8 offset-md-2 col-12 radius-6 srvQus_Box">
    <ContentLoader
      speed={loader_config.speed}
      backgroundColor={loader_config.backgroundColor}
      foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 450"
      height={"450"}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="450" />
      {/* <rect x="200" y="420" rx="0" ry="0" width="106" height="40" /> */}
    </ContentLoader>
  </div>
)

export default SpqQuestionLoader;