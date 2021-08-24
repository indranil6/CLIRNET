import React from "react"
import ContentLoader from "react-content-loader"

const RelatedMedwikiLoaderMobile = (props) => (
  <ContentLoader 
    speed={2}
    backgroundColor="#7f8c8d"
    foregroundColor="#fff" 
    viewBox="0 0 100% 108"   
    height={108} 
    width={"100%"} 
    style={{ width: '100%' }}
    {...props}
  >
   <rect x="0" y="-1" rx="4" ry="4" width="100" height="118" /> 
    <rect x="106" y="3" rx="0" ry="0" width="70" height="17" /> 
    <rect x="105" y="31" rx="0" ry="0" width="100%" height="13" />
  </ContentLoader>
)

export default RelatedMedwikiLoaderMobile;