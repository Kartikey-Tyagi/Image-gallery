import React from 'react'

export default function Navbar(props) {
    return (
        <div className="nav_container">
            <div
                className="navbar_brand"
                onClick={() => {
                    props.setProgress(30);
                    props.setQuery("latest");
                    window.scrollTo(0, 0);
                    props.setProgress(60);
                    props.updateData();
                    props.setModel(false);
                    props.setProgress(100);

                }}
            >
                <h1 className="text_center">Image Gallery</h1>
            </div>
            <div className="nav_links_list">
                <ul>
                    <li><a href="/">Explore</a></li>
                    <li><a href="/">Collection</a></li>
                    <li><a href="/">Community</a></li>
                </ul>
            </div>
        </div>
    )
}
