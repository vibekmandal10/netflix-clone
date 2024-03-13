import React, { useEffect, useState } from 'react'
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiColor, BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
const url = "https://api.themoviedb.org/3";
const apiKey = "4a3dd7fdbc560c24923aa2f0dea1af00";
const img_url = "https://image.tmdb.org/t/p/original/";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({img}) =>(
    <img className='card' src= {img} alt='cover' />
)
    
// const arr = [
//     {img:"https://th.bing.com/th?id=OIP.mn_S_jFWT03vwsN6nE2c9QHaL1&w=197&h=315&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"},
//     {img:"https://th.bing.com/th?id=OIP.mn_S_jFWT03vwsN6nE2c9QHaL1&w=197&h=315&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"},
//     {img:"https://th.bing.com/th?id=OIP.mn_S_jFWT03vwsN6nE2c9QHaL1&w=197&h=315&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"},
//     {img:"https://th.bing.com/th?id=OIP.mn_S_jFWT03vwsN6nE2c9QHaL1&w=197&h=315&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
// ]

const Row = ({title, arr}) =>{
    return <div className='row'>

        <h2>{title}</h2>
        <div>
        {arr.map((item,index) => {
            const image = `${img_url}${item.poster_path}`
           return <Card key={index} img={image}/>
        }
        )}
        </div>
        
    </div>
}

const Home = () => {
    
    const [upcomingMovies,setUpcomingMovies] = useState([])
    const [popularMovies , setPopularMovies] = useState([])
    const [topRatedMovies , setTopRatedMovies] = useState([])
    const [nowPlayingMovies , setNowplayingMovies] = useState([])
    const [genre , setGenre] = useState([])




  useEffect(()=>{
    const fetchUpcoming = async() =>{
       const {data : {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
       setUpcomingMovies(results)
       
    }
    const fetchNowPlaying = async() =>{
        const {data : {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
        setNowplayingMovies(results)
        
     }
    const fetchTopRated = async() =>{
        const {data : {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
        setTopRatedMovies(results)
       
     }
    const fetchPopular = async() =>{
        const {data : {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
        setPopularMovies(results)
        
     }

     const getAllGenre = async () => {
        const {data : {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
        console.log(genres)
        setGenre(genres)
     }
    fetchUpcoming()
    fetchPopular()
    fetchTopRated()
    fetchNowPlaying()
    getAllGenre()
  },[])



  return (
   <section className='home'>
    <div className="banner" style={{
        backgroundImage: popularMovies[0] ? `url(${`${img_url}${popularMovies[0].poster_path}`})` :"rgb(16,16,16)"

    }}>
      {popularMovies[0] &&  <h1>{popularMovies[0].original_title}</h1>} 
      {popularMovies[0] &&   <p>{popularMovies[0].overview } </p>}
    
    <div>
    <button> <BiPlay /> Play</button>
    <button>My List <AiOutlinePlus /> </button>
    </div>
    

    </div>

    <Row title={"Upcoming Movies"} arr={upcomingMovies} />
    <Row title={"Top Rated Movies"} arr={topRatedMovies} />
    <Row title={"Popular Movies"} arr={popularMovies} />
    <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />
    
    <div className="genreBox">
        
        {genre.map((item)=> (
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
    </div>
    <div style={{backgroundColor:"black"}}>
        <center style={{color: "white",padding:"20px 0 20px 0",width:"100%"}} >Developed by @Vibek Mandal</center>
    </div>
    
   </section>
  )
}

export default Home