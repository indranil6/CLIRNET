import React from 'react';
import attachmentIcon from '../../../images/paper-clip.png';

class ActivityPendingCard extends React.Component {
  render() {
    let pData = this.props.data;
    return (
      <>
        <PendingDesktopCard cardData={pData} customClass={this.props.customClass} cardClick={this.props.click.bind(this)} />
      </>
    );
  }
}
export default ActivityPendingCard;

const PendingDesktopCard = (props) => {

  return (
    <>
    <div className={props.customClass + " dskHspltActivitesCard dskHspltActivitesYellow"} onClick={props.cardClick.bind(this, props.cardData)}>
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
        <div className="full_width colorBlack dskHspltActivitesCardBttm">
          <h4 className="font_14px">
            {props.cardData.rd_req_date_format}
            </h4>
          <h6 className="font_14px">
            <span className="font600 colorBlack dskHspltActivitesAttchd"><span><img src={attachmentIcon} /></span> {props.cardData.total_attachment} </span>
          </h6>

        </div>
        <div className="clearfix"></div>
        <div className="clearfix"></div>
      </div>
    </div>
    </>
  )
}