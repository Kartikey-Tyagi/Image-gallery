import React from 'react';
import searchImg from "../images/search.png";
import ImageItems from './ImageItems';
import Model from './Model';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import LoadingBar from 'react-top-loading-bar';


export default function Home(props) {
    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={props.progress}
                onLoaderFinished={() => props.setProgress(0)}
                shadow={true}
            />

            {!props.model && <div className="home_container">
                <div className="home_content">
                    <h2 className="text_center">Download High Quality Images by creators</h2>
                    <p className="text_center"><small>Over 2.4 million+ stock Images by our talented community</small></p>
                </div>
                <form onSubmit={props.handleFormSubmit} style={{ display: "contents" }}>

                    <div className="home_search_bar">
                        <img src={searchImg} alt="search_logo" onClick={props.handleFormSubmit} />
                        <input type="search" onChange={(e) => props.setQuery(e.target.value)} className="home_search_input" placeholder="Search high resolution Images, categories, wallpapers" />
                    </div>
                </form>
            </div>}
            {props.model && <Model openModel={props.setModel} element={props.modelElement} loader={props.loader} />}
            {props.model && <h2 className="text_center related_images"><ImQuotesLeft /><span style={{ margin: "8px" }}>Related Images</span><ImQuotesRight /></h2>}

            <InfiniteScroll
                dataLength={props.image.length}
                next={props.fetchMoreData}
                hasMore={props.image.length !== props.results}
                loader={<Spinner />}
                scrollThreshold={0.9}
                endMessage={<h3 className="text_center" style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>No more Images to show<small style={{ margin: "5px 0 0 5px" }}><BsEmojiSmile /></small></h3>}
            >
                <div className="image_container">
                    {props.image.map((element, key) => {
                        return <ImageItems key={key} element={element} openModel={props.setModel} setModelElement={props.setModelElement} loader={props.loader} setLoader={props.setLoader} setProgress={props.setProgress} />
                    })}
                </div>
            </InfiniteScroll>

        </>

    )
}
