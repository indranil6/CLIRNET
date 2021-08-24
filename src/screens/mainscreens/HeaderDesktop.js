import React, { Component } from "react";
import $ from "jquery";
import ReactGA from "react-ga";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import "../../css/desktop.css";
import "../../css/new-responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import { createBrowserHistory } from "history";
import logoTop from "../../desktopImages/logoTop.png";
import navSearch from "../../desktopImages/navSearch.png";
import navVault from "../../desktopImages/navVault.png";
import navLogout from "../../desktopImages/navLogout.png";
import MarqueeText from "../dashboard_desktop/MarqueeText.js";
import { isMobile } from "react-device-detect";

var firstnamefirst_letter = "";
const url = AppConfig.apiLoc;
const wordpress_url = AppConfig.wp_url;
const img_path = AppConfig.img_path + "uploads/";
const history = createBrowserHistory();
//ReactGA.set({ dimension14: 'Sports' });

var phone_no = "";
class HeaderDesktop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_no: "",
      err_msg: "",
      otp: "",
      isOpen: false,
    };

    fetch(url + "user/detail", {
      method: "GET",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: `/`,
        });
      });
    this.redirect_to_session = this.redirect_to_session.bind(this);

    if (
      reactLocalStorage.get("@ClirnetStore:page_reload_for_cph", true) ==
        "1111" &&
      window.location.href.indexOf("Cph") == -1
    ) {
      reactLocalStorage.set("@ClirnetStore:page_reload_for_cph", "2222");
      //window.location.reload();
    }
  }

  handleOpen = () => {
    // console.log("handel open called")
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    // console.log("handel close called")
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    setTimeout(function () {
      if (window.location.href.indexOf("Dashboard") == -1) {
        reactLocalStorage.set("@ClirnetStore:page_reload", "1111");
      } else {
        reactLocalStorage.set("@ClirnetStore:page_reload", "2222");
      }

      if (window.location.href.indexOf("Cph") != -1) {
        reactLocalStorage.set("@ClirnetStore:page_reload_for_cph", "1111");
      }
    }, 500);

    $("#zmmtg-root").remove();
    //Getting first letter of logged in user's name
    firstnamefirst_letter = reactLocalStorage.get(
      "@ClirnetStore:first_name",
      true
    );

    if (firstnamefirst_letter != "" && firstnamefirst_letter != true) {
      firstnamefirst_letter = firstnamefirst_letter.substring(0, 1);
    }
  }

  componentWillMount() {
    document.title = "CLIRNet";
  }

  redirect_to_dashboard() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Dashboard");
    }

    if (window.location.href.indexOf("Dashboard") == -1) {
      this.props.history.push({
        pathname: `/Dashboard`,
      });
    }
  }

  redirect_to_session() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Sessions");
    }
    this.props.history.push({
      pathname: `/Sessions`,
    });
  }

  redirect_to_feeds() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Feeds");
    }
    this.props.history.push({
      pathname: `/Feeds`,
    });
  }
  redirect_to_grandrounds() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/GrandRoundlisting");
    }
    this.props.history.push({
      pathname: `/GrandRoundlisting`,
    });
  }

  redirect_to_vault() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Vault");
    }
    this.props.history.push({
      pathname: `/Vault`,
    });
  }

  redirect_to_profile() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Profile");
    }
    this.props.history.push({
      pathname: `/Profile`,
    });
  }

  redirect_to_search() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/SearchResult");
    }

    this.props.history.push({
      pathname: `/SearchResult`,
    });
  }

  redirect_to_survey() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Spq");
    }
    this.props.history.push({
      pathname: `/Spq`,
    });
  }

  redirect_to_telemed() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/TeleMed");
    }
    this.props.history.push({
      pathname: `/TeleMed`,
    });
  }

  redirect_to_covid() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/CphDesktop");
    }
    this.props.history.push({
      pathname: "/CphDesktop",
    });
  }

  redirect_to_activities() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Activities");
    }
    this.props.history.push({
      pathname: `/Activities`,
    });
  }
  redirect_to_discuss_refer() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/DiscussAndRefer");
    }
    this.props.history.push({
      pathname: `/DiscussAndRefer`,
    });
  }

  redirect_to_deals() {
    if (window.location.href.indexOf("Cph") != -1) {
      reactLocalStorage.set("@ClirnetStore:jugar_url", "/Deals");
    }
    this.props.history.push({
      pathname: `/Deals`,
    });
  }

  logout() {
    if (window.confirm("Are You Sure?")) {
      this.logoutFromWp(wordpress_url);
      reactLocalStorage.set("@ClirnetStore:refreshToken", "");
      reactLocalStorage.set("@ClirnetStore:user_master_id", "");
      reactLocalStorage.set("@ClirnetStore:user_mem_id", "");
      reactLocalStorage.set("@ClirnetStore:client_logo", "");
      reactLocalStorage.set("@ClirnetStore:user_name", "");
      reactLocalStorage.set("@ClirnetStore:email", "");
      reactLocalStorage.set("@ClirnetStore:mobilePrimary", "");
      reactLocalStorage.set("@ClirnetStore:password", "");
      reactLocalStorage.set("@ClirnetStore:first_name", "");
      reactLocalStorage.set("@ClirnetStore:last_name", "");
      reactLocalStorage.set("@ClirnetStore:profile_image", "");
      reactLocalStorage.set("@ClirnetStore:profile_type", "");
      reactLocalStorage.set("@ClirnetStore:vault_count", "0");
      this.props.history.push({
        pathname: `/`,
      });
    }
  }

  logoutFromWp(locations) {
    let request = new XMLHttpRequest();
    request.open("GET", locations, true);
    request.onload = () => {
      console.log("load url");
    };
    request.send();
  }

  render() {
    return (
      <Navbar expand="lg" fixed="top" className="dskHeader">
        <div className="full_width">
          {/* /////marquee-start///////// */}
          <MarqueeText />
          {/* /////marque-end///////// */}
          <div className="full_width dskNav">
            <div className="row align-items-center">
              <Navbar.Brand
                href="javascript:void(0)"
                onClick={() => {
                  this.redirect_to_dashboard();
                }}
              >
                <img src={logoTop} alt="CLIRnet" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                id="responsive-navbar-nav"
                className=" justify-content-between"
              >
                <Nav className="font_14px col fontExo font500 dskNavMenu">
                  <Nav.Link
                    className="limain li_home"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_dashboard();
                    }}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    className="limain li_covid"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_covid();
                    }}
                  >
                    COVID Peer Hotline
                  </Nav.Link>

                  <Nav.Link
                    className="limain li_session"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_session();
                    }}
                  >
                    Live CME
                  </Nav.Link>
                  <Nav.Link
                    className="limain li_medwiki"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_feeds();
                    }}
                  >
                    MedWiki
                  </Nav.Link>
                  <Nav.Link
                    className="limain li_grandround"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_grandrounds();
                    }}
                  >
                    Grand Rounds
                  </Nav.Link>
                  <Nav.Link
                    className="limain li_survey"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_survey();
                    }}
                  >
                    Polls &amp; Quizzes
                  </Nav.Link>
                  <Nav.Link
                    className="limain li_telemed"
                    href="javascript:void(0)"
                    onClick={() => {
                      this.redirect_to_telemed();
                    }}
                  >
                    TeleMed Lite
                  </Nav.Link>

                  {/* <Nav.Link className="limain li_discuss_and_refer" href="javascript:void(0)" onClick={() => { this.redirect_to_discuss_refer(); }}>Discuss &amp; Refer</Nav.Link> */}
                </Nav>
                <Nav className="dskNavRight align-items-center">
                  <Nav.Link
                    href="javascript:void(0)"
                    className="radius-100 dskNavProfile"
                    onClick={() => {
                      this.redirect_to_profile();
                    }}
                    style={{ "background-color": "#21c6b1" }}
                  >
                    <h5 className="font600 colorWhite font_24px text-uppercase translate_both header_profile_ttl">
                      {firstnamefirst_letter}
                    </h5>
                  </Nav.Link>
                  <Nav.Link
                    className="radius-100"
                    onClick={() => {
                      this.redirect_to_search();
                    }}
                  >
                    <img
                      src={navSearch}
                      alt="search"
                      className="translate_both"
                    />
                  </Nav.Link>
                  <Nav.Link
                    className="radius-100 active dskNavVault"
                    onClick={() => {
                      this.redirect_to_vault();
                    }}
                  >
                    <img
                      src={navVault}
                      alt="search"
                      className="translate_both"
                    />
                    {parseInt(
                      reactLocalStorage.get("@ClirnetStore:vault_count", true)
                    ) > 0 ? (
                      <span className="radius-100 font_12px">
                        {reactLocalStorage.get(
                          "@ClirnetStore:vault_count",
                          true
                        )}
                      </span>
                    ) : null}
                  </Nav.Link>
                  <Nav.Link
                    className="radius-100"
                    onClick={() => {
                      this.logout();
                    }}
                  >
                    <img
                      src={navLogout}
                      alt="search"
                      className="translate_both"
                    />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default HeaderDesktop;
