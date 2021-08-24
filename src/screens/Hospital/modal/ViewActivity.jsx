import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import visibility from '../../../desktopImages/visibility.png';
import downloadWhite from '../../../desktopImages/downloadWhite.png';
import Form from 'react-bootstrap/Form';
import closeIcon from '../../../images/responsive-icon-active.png';

export default function ViewActivity({ data, onCloseModal }) {
    const [modalVisibility, setModalVisibility] = useState(true);
    const [casePrescription, setCasePrescription] = useState([]);
    const [caseReport, setCaseReport] = useState([]);

    useEffect(() => {
        // alert("data\n"+JSON.stringify(JSON.parse(unescape(data.case_prescription)))) 
        setCasePrescription(JSON.parse(unescape(data.case_prescription)))
        setCaseReport(JSON.parse(unescape(data.case_reports)))
    }, [data])

    const download =( e, fileName )=> {
        console.log(e.target.href);
        fetch(e.target.href, {
          method: "GET",
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", fileName); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
        })
          .catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <Modal id="root-modal" backdrop={'static'} keyboard={false} className="in dicussRefferDtlsPop" centered="true" animation="slide" show={modalVisibility} onHide={() => { setModalVisibility(false) }}>
                <Modal.Header className="align-items-center justify-content-between">
                    <Modal.Title className="font600 font_16px colorWhite">Activity Details <span className="font_14px">(Ticket No: {data.master_referral_discussion_id})</span></Modal.Title>
                    <a href="javascript:void(0)" className="radius-100 dicussRefferDtlsPopclose" variant="secondary" onClick={() => { setModalVisibility(false); onCloseModal() }}>
                        <img src={closeIcon} />
                    </a>
                </Modal.Header>
                <Modal.Body>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Case Topic</td>
                                <td>{data.referral_case_subject}</td>
                            </tr>
                            <tr>
                                <td>Patient Details</td>
                                <td>
                                    <h4 className="font500 font_14px">{data.pat_first_name + " " + data.pat_last_name} <span>({data.pat_gender} / {data.calc_pat_age})</span></h4>
                                    <h4 className="font500 font_14px">{data.pat_mobile}</h4>

                                </td>
                            </tr>
                            <tr>
                                <td>Case Condition</td>
                                {data.case_condition ==1? <td>{data.case_condition_name}</td>:null}
                                {data.case_condition ==2? <td className="colorRed">{data.case_condition_name}</td>:null}
                                {data.case_condition ==3? <td className="colorBlue">{data.case_condition_name}</td>:null}
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {/* {data.total_attachment} */}
                                    <div className="full_width dskHspitalFormFileShow">
                                        <h4 className="font_14px colorBlack font500">Case Prescription</h4>
                                        <div className="clearfix"></div>
                                        <div className="row">
                                            {
                                                (casePrescription.length > 0) ?
                                                    <>
                                                        {
                                                            casePrescription.map((rData, ind) => (
                                                            <div className="col-6 col-sm-4 dskHspitalFormFileBox">
                                                                <div className="full_width dskHspitalFormFileBoxIn"> 
                                                                    {(rData.fie_type !== "pdf")?
                                                                    <img src="https://image.flaticon.com/icons/png/512/337/337946.png" className="translate_both" />:
                                                                    <img src={rData.url} className="translate_both" />}
                                                                    <a href={rData.url} target="_blank" download>
                                                                        <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                            <img src={visibility} className="translate_both" />
                                                                        </div>
                                                                    </a> 
                                                                    <a href={rData.url} target="_blank" onClick={(e)=>download(e,rData.name)}>
                                                                        <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionDonload">
                                                                            <img src={downloadWhite} className="translate_both" />
                                                                        </div> 
                                                                    </a> 
                                                                </div>
                                                            </div> 
                                                            ))
                                                        }
                                                    </> : null
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <div className="full_width dskHspitalFormFileShow">
                                        <h4 className="font_14px colorBlack font500">Case Reports</h4>
                                        <div className="clearfix"></div>
                                        <div className="row">
                                        {
                                            (caseReport.length > 0) ?
                                                <>
                                                    {
                                                        caseReport.map((rData, ind) => (
                                                        <div className="col-6 col-sm-4 dskHspitalFormFileBox">
                                                            <div className="full_width dskHspitalFormFileBoxIn"> 
                                                                {(rData.fie_type !== "pdf")?
                                                                    <img src="https://image.flaticon.com/icons/png/512/337/337946.png" className="translate_both" />:
                                                                    <img src={rData.url} className="translate_both" />
                                                                }
                                                                <a href={rData.url} target="_blank" download>
                                                                    <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                        <img src={visibility} className="translate_both" />
                                                                    </div> 
                                                                </a>
                                                                <a href={rData.url} target="_blank" onClick={(e)=>download(e,rData.name)}>
                                                                    <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionDonload">
                                                                        <img src={downloadWhite} className="translate_both" />
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div> 
                                                        ))
                                                    }
                                                </> : null
                                        }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </div>
    )
}

// const FilePreviewCard = ({props, fileType, actionType}) => (
//     <div className="col-3 dskHspitalFormFileBox">
//         {(fileType !== 'pdf') ?
//             <div className="full_width dskHspitalFormFileBoxIn">
//                 <img src={props.data[0].url} className="translate_both" />
//                 <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
//                     <img src={visibility} className="translate_both" />
//                 </div>
//             </div> 
//             :
//             <div className="full_width dskHspitalFormFileBoxIn">
//                 <img src="https://image.flaticon.com/icons/png/512/337/337946.png" className="translate_both" />
//                 <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
//                     <img src={visibility} className="translate_both" />
//                 </div>
//             </div>
//         } 
//     </div>
// )

                                           