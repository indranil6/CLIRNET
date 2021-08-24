import React from "react";
import { isMobile } from "react-device-detect";
class GrandRounds extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (isMobile) {
      this.props.history.push({
        pathname: "/GrandRoundsMobile/" + this.props.match.params.id + "",
      });
    } else {
      this.props.history.push({
        pathname: "/GrandRoundsDesktop/" + this.props.match.params.id + "",
      });
    }
  }

  render() {
    return <div></div>;
  }
}

export default GrandRounds;
