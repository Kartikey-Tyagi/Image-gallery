import React from 'react'
import searchImg from "../images/search.png"
import { useEffect, useState } from 'react'
import ImageItems from './ImageItems'
import Model from './Model';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from './Navbar';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import LoadingBar from 'react-top-loading-bar'


export default function Home() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('latest');
    const [image, setImage] = useState([]);
    const [results, setResults] = useState(null);
    const [model, setModel] = useState(false);
    const [modelElement, setModelElement] = useState(null);
    const [loader, setLoader] = useState(false);
    const [progress, setProgress] = useState(0)

    const client_id = "1sJFIuVGLKAeSCwkYzEpTfi_TLOP5WIJ1EurQLVqHws";

    const updateData = async () => {
        const url = `https://api.unsplash.com/photos?page=1&per_page=30&client_id=${client_id}`;
        setLoader(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setImage(parsedData);
        setResults(parsedData.total);
        setLoader(false);
    }

    useEffect(() => {
        updateData();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (query !== "") {
            setProgress(40);
            setPage(1);
            setImage([]);
            setLoader(true);
            const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query}&client_id=${client_id}`;
            let data = await fetch(url);
            setProgress(70);
            let parsedData = await data.json();
            setImage(parsedData.results);
            setResults(parsedData.total);
        }
        setLoader(false);
        setProgress(100);
    };

    const fetchMoreData = async () => {
        setPage(prevPage => prevPage + 1);
        const url = `https://api.unsplash.com/search/photos?page=${page + 1}&per_page=30&query=${query}&client_id=${client_id}`;
        setLoader(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setImage([...image, ...parsedData.results]);
        setResults(parsedData.total);
        setLoader(false);
    };


    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                shadow={true}
            />
            <Navbar updateData={updateData} setModel={setModel} setLoader={setLoader} setQuery={setQuery} setProgress={setProgress} />
            {!model && <div className="home_container">
                <div className="home_content">
                    <h2 className="text_center">Download High Quality Images by creators</h2>
                    <p className="text_center"><small>Over 2.4 million+ stock Images by our talented community</small></p>
                </div>
                <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>

                    <div className="home_search_bar">
                        <img src={searchImg} alt="search_logo" onClick={handleFormSubmit} />
                        <input type="search" onChange={(e) => setQuery(e.target.value)} className="home_search_input" placeholder="Search high resolution Images, categories, wallpapers" />
                    </div>
                </form>
            </div>}
            {model && <Model openModel={setModel} element={modelElement} loader={loader} />}
            {model && <h2 className="text_center related_images"><ImQuotesLeft /><span style={{ margin: "8px" }}>Related Images</span><ImQuotesRight /></h2>}

            <InfiniteScroll
                dataLength={image.length}
                next={fetchMoreData}
                hasMore={image.length !== results}
                loader={<Spinner />}
                scrollThreshold={0.9}
                endMessage={<h3 className="text_center" style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>No more Images to show<small style={{ margin: "5px 0 0 5px" }}><BsEmojiSmile /></small></h3>}
            >
                <div className="image_container">
                    {image.map((element, key) => {
                        return <ImageItems key={key} element={element} openModel={setModel} setModelElement={setModelElement} loader={loader} setLoader={setLoader} setProgress={setProgress}/>
                    })}
                </div>
            </InfiniteScroll>

        </>

    )
}
