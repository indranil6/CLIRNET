import React from 'react';
import dskHspltDbSliderBg from '../../../desktopImages/dskHspltDbSliderBg.jpg';
import begainArrow from '../../../desktopImages/begainArrow.png';
import attachmentIcon from '../../../images/paper-clip.png';
class ActivityRejectedCard extends React.Component {
  render() {
    let rData = this.props.data;
    return (
      <RejectedDesktopCard
        cardData={rData}
        customClass={this.props.customClass}
        reDiscussClick={this.props.reDiscussClick}
        cardClick={this.props.click.bind(this)}
        referClick={this.props.referClick} />
    );
  }
}
export default ActivityRejectedCard;

const RejectedDesktopCard = (props) => (
  <div className={props.customClass + " dskHspltActivitesCard dskHspltActivitesRed"} onClick={props.cardClick.bind(this, props.cardData)}>
    <div className="full_width radius-6 text-left dskHspltActivitesCardIn">

      <div className="full_width dskHspltActivitesCardTop">
        <h5 className="colorBlack font600 font_14px dskHspltActivitesTopRight"> {props.cardData.operation_type_name}</h5>
        <h4 className="font600 colorBlack font_14px dskHspltActivitesTopRight"> <span className="font400 dskHspltActivitesStts">{props.cardData.process_status_name}</span></h4>
      </div>
      <h2 className="font_18px colorBlack font500">{props.cardData.referral_case_subject}</h2>
      <div className="clearfix"></div>
      <h3 className=" font400 colorGrey font_16px">{props.cardData.referred_client_name}</h3>
      <div className="clearfix"></div>
      <h3 className=" font400 colorGrey font_16px">{props.cardData.referred_user_first_name} {props.cardData.referred_user_last_name}</h3>

      <div className="clearfix"></div>

      <div className="full_width colorBlack dskHspltActivitesCardBttm">
        <h4 className="font_14px">
          {props.cardData.rd_req_date_format}
            {/* 10th Jan, 2020 6:34pm */}
            </h4>
        <h6 className="font_14px">
          <span className="font600 colorBlack dskHspltActivitesAttchd"><span><img src={attachmentIcon} /></span> {props.cardData.total_attachment} </span>
          {/* <span className="dskHspltActivitesCondition colorRed">{props.cardData.case_condition_name}</span> */}
          {/* ---color Class Names
              <span className="dskHspltActivitesCondition colorBlue">{props.cardData.case_condition_name}</span>
            <span className="dskHspltActivitesCondition colorGreen">{props.cardData.case_condition_name}</span> */}
        </h6>

      </div>

      <div className="full_width dskHspltDbCardBttnArea">
        <div className="radius-8 colorWhite dskHspltDbCardBttn" onClick={props.reDiscussClick}>
          <span>Re Initialize <img src={begainArrow} /></span>
        </div>
        {(props.cardData.operation_type == 1 && props.cardData.process_status == 5) ?
          <div className="radius-8 colorWhite dskHspltDbCardBttn" onClick={props.referClick}>
            <span>Refer <img src={begainArrow} /></span>
          </div> : null
        }

      </div>

    </div>
  </div>
)