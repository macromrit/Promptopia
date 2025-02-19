'use client';
import {useState, useEffect } from 'react'

import PromptCard from './PromptCard';


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt?search=${searchText}`);
      const data = await response.json();
      // console.log("API Response:", data); // Check response
      setPosts(data);
    };

    fetchPosts();
  }, [searchText]); // Fetch whenever searchText changes

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagSearch = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className='feed'>

      <form className='relative w-full flex-center'>
        <input 
        type="text" 
        placeholder='search for a tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagSearch}
      />

    </section>
  )
}

export default Feed
