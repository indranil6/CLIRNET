import React from "react"
import ContentLoader from "react-content-loader"

import loader_config from "./loader_config";
const ProfileLoader = (props) => (
    <div className="full_width text-left radius-6 profileRow">
        <ContentLoader
            speed={loader_config.speed}
            backgroundColor={loader_config.backgroundColor}
            foregroundColor={loader_config.foregroundColor}
            viewBox="0 0 100% 70"
            height={70}
            width={"100%"}
            style={{ width: '100%' }}
            {...props}
        >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="71" />
            {/* <rect x="0" y="80" rx="0" ry="0" width="100%" height="13" /> */}
        </ContentLoader>
    </div>
)

export default ProfileLoader;