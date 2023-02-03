import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import uuid from 'react-uuid';

import Spinner from './Spinner';
import GiphyList from './GiphyList';


export const GiphyItem = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [length, setLength] = useState(0);

  const limit = 10;
  const api_key = "AxOUWhDlkZ01fceCWz32ZUuRELa2FGGT";
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&rating=g&limit=${limit}&offset=${offset}`;

  const getGiphy = async () => {
    const response = await fetch(url);
    const responseData = await response.json();
    setIsLoading(false);
    setData(responseData.data);
    setTotalResults(responseData.pagination.total_count);
    setLength(data.length);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      setIsLoading(true);
      url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=10&offset=0&rating=g&lang=en`
      const response = await fetch(url);
      const responseData = await response.json();
      setIsLoading(false);
      setData(responseData.data);
      setQuery('');
    } else {
      console.log('empty values');
    }
  };

  const fetchMoreData = async () => {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&rating=g&limit=${limit}&offset=${offset + limit}`;
    setOffset(offset);
    const response = await fetch(url);
    const responseData = await response.json();
    setData(data.concat(responseData.data));
    setIsLoading(false);
    setTotalResults(responseData.pagination.total_count);
    setLength(data.length);
  };


  useEffect(() => {
    getGiphy();
  }, [])


  return (
    <div>
      <h2 className={`my-4 text-center text-${props.mode === 'dark' ? 'light' : 'dark'}`}>Welcome to Trending Giphy Items</h2>
      <form className='container my-4' onSubmit={handleSubmit}>
        <div className="row">
          <div className="mx-auto col-md-9">
          <input 
            type="text"
            id='query'
            name='query'
            value={query}
            onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search" />
          </div>
          <div className="col-md-3">
            <button className='btn btn-primary' type='submit'>Search the trends</button>
          </div>
        </div>
      </form>
      {isLoading && <Spinner />}
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={length <= totalResults}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
      >
        <div className="row">
          {data.map((article) => {
            return (
              <div className="col-md-3" key={uuid()}>
                <GiphyList url={article.url} image_still={article.images.original_still.url}
                  image={article.images.original.url} height={article.images.height} width={article.images.width}
                />
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}
