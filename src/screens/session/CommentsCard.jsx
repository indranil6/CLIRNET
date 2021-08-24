import React from 'react';
export default function CommentsCard(props) {
    return (
        <div className="full_width font_12px videoCommentsRow">
            <h4 className="font600 font_14px colorBlack videoCommentBy">{props.name}</h4>
            <p>{props.comments}</p>
        </div>
    )
}

