import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import ShareIcon from '../../desktopImages/share-black.png';
import { isMobile } from 'react-device-detect';
export default function Share({ data, customClass }) {
  const [shareData, setShareData] = useState({});
  const [extraCustomClass, setextraCustomClass] = useState('clirnetShareBtn');

  useEffect(() => {
    let tempData = {};
    tempData = {
      title: data.title,
      // text: video_detail_data.answer,
      url: data.url,
    }
    setShareData(tempData)
    if (customClass) { setextraCustomClass(customClass) }
  }, [])

  let share_url = () => {
    if (navigator.canShare) {
      navigator.share(shareData)
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
    } else {
      copy_to_Clipboard(shareData.url)
    }
  }

  const copy_to_Clipboard = str => {
    let textarea;
    let result;
    try {
      textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', true);
      textarea.setAttribute('contenteditable', true);
      textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = str;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand('copy');
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      document.body.removeChild(textarea);
    }
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
      result = prompt(`Press ${copyHotkey}`, str); // eslint-disable-line no-alert
      if (!result) {
        return false;
      }
    }
    ToastsStore.success("Share Link Is Copied To Your Clipboard");
    return true;
  }

  return (
    <div className={extraCustomClass}>
      {/* <a href="javascript:void(0)" className="dskCphTtlShare" onClick={() => share_url()}><img src={ShareIcon} /> Share</a> */}
      {isMobile ?
        <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon" onClick={() => share_url()}>
          <span>
            <img src={ShareIcon} alt="Vault" className="translate_both mblGrLeftShareImg" />
          </span>
          Share
        </a> :
        <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon" onClick={() => share_url()}>
          <span>
            <img src={ShareIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
          </span>
          Share
        </a>}

      <ToastsContainer store={ToastsStore} />


    </div>
  )
}
