import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useEffect, useState } from 'react';

function App() {
  const [page, setPage] = useState(1);
    const [query, setQuery] = useState('latest');
    const [image, setImage] = useState([]);
    const [results, setResults] = useState(null);
    const [model, setModel] = useState(false);
    const [modelElement, setModelElement] = useState(null);
    const [loader, setLoader] = useState(false);
    const [progress, setProgress] = useState(0);

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
      <Navbar updateData={updateData} setModel={setModel} setLoader={setLoader} setQuery={setQuery} setProgress={setProgress} />
      <Home image={image} setQuery={setQuery} model={model} setModel={setModel} modelElement={modelElement} setModelElement={setModelElement} setLoader={setLoader} setProgress={setProgress} results={results} loader={loader} fetchMoreData={fetchMoreData} handleFormSubmit={handleFormSubmit} progress={progress} />
    </>
  );
}

export default App;
