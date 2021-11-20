import React from 'react';
import { FiThumbsUp, FiTwitter } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import { AiOutlineInstagram } from 'react-icons/ai';
import Spinner from './Spinner';

export default function Model(props) {
    const updateTime = props.element.updated_at;
    return (
        <>
            <div className="model_background">
                <div className="model_card">
                    {props.loader ? <Spinner /> : <div className="model_body">
                        <img src={props.element.urls.full} alt={props.element.alt_description} />
                        <div className="model_content">
                            <img src={props.element.user.profile_image.small} alt="userImage" />
                            <div className="model_data">
                                <div>
                                    <h5>{props.element.user.name}</h5>
                                    <p><small><em>@{props.element.user.username}</em></small></p>
                                </div>
                                <div className="social_media">
                                    <p><AiOutlineInstagram />/<small>{props.element.user.social.instagram_username}</small></p>
                                    <p><FiTwitter /><small>/{props.element.user.social.twitter_username}</small></p>
                                </div>
                                <div className="likes">
                                    <p><span><FiThumbsUp />50</span></p>
                                    <small>Updated On:</small>
                                    <small>{new Date(updateTime).toGMTString()}</small>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="close_btn">
                        <ImCross onClick={() => props.openModel(false)} />
                    </div>
                </div>
            </div>
        </>
    )
}
