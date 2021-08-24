import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const SpqSuccessfullSliderLoader = (props) => (
  <div className="dashboardSlider">
    <ContentLoader
      speed={loader_config.speed}
      backgroundColor={loader_config.backgroundColor}
      foregroundColor={loader_config.foregroundColor}
      viewBox="0 0 100% 201"
      height={201}
      width={"100%"}
      style={{ width: '100%' }}
      {...props}
    >


      <rect x="0" y="0" rx="0" ry="0" width="100%" height="201" />
    </ContentLoader>
  </div>
)

export default SpqSuccessfullSliderLoader;