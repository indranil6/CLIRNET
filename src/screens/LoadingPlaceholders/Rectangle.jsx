import React from "react"
import ContentLoader from "react-content-loader"
import loader_config from "./loader_config";

const Rectangle = (props) => (
    <ContentLoader
    speed={loader_config.speed}
    backgroundColor={loader_config.backgroundColor}
    foregroundColor={loader_config.foregroundColor}
    viewBox={"0 0 "+props.width+" "+props.height}
    height={props.height} 
    width={props.width}
    {...props}
  >
<rect x="0" y="0" rx="2" ry="2" width={props.width} height={props.height}/> 

  </ContentLoader>
)

export default Rectangle;