import React from 'react'
import Index from '../components/Index'
import Row from '../components/Row'
import requests from '../Request'

const Home = () => {
  return (
    <div>
        < Index/>
        < Row rowID='1' title="Up Coming" fetchURL= {requests.requestUpcoming} />
        < Row rowID='2' title="Popular" fetchURL= {requests.requestPopular} />
        < Row rowID='3' title="Top Rated" fetchURL= {requests.requestTopRated} />
        < Row rowID='4' title="Trending" fetchURL= {requests.requestTrending} />
        < Row rowID='5' title="Now Playing" fetchURL= {requests.requestTV} />
    </div>
  )
}

export default Home