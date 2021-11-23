import React from 'react';
import { FiThumbsUp } from 'react-icons/fi';

export default function ImageItems(props) {

    const getData = () => {
        props.setLoader(true);
        props.setProgress(30);
        props.setModelElement(props.element);
        props.setProgress(70);
        window.scrollTo(0, 0);
        props.openModel(true);
        props.setProgress(100);
        props.setLoader(false);
    };

    return (
        <>
            <div className="image_row">
                <img src={props.element.urls.small} alt={props.element.alt_description} onClick={() => getData()} />
                <div className="user_content">
                    <img src={props.element.user.profile_image.small} alt="userImage" />
                    <div className="user_data">
                        <div>
                            <h5>{props.element.user.name}</h5>
                            <p><small><em>@{props.element.user.username}</em></small></p>
                        </div>
                        <div className="likes">
                            <p><span><FiThumbsUp />{props.element.user.total_likes}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
