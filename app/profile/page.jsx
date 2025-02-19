"use client";

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    const [isUserProfile, setIsUserProfile] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const profileId = searchParams.get("id");
    const userName = searchParams.get("name");

    useEffect(() => {
        const fetchPosts = async () => {
            console.log(session.user)
          if (!session?.user?.id) {console.log("UNKNOWN ID"); return;} // ✅ Avoid fetching with undefined ID
        //   console.log("HELLO")
            
          if (!profileId) {
            const response = await fetch(`/api/users/${session.user.id}/posts`);
            const data = await response.json();
            setIsUserProfile(true);
            setPosts(data);
            return;
          }
          
          
          if (session.user.id === profileId) {setIsUserProfile(true);}
          else {setIsUserProfile(false);}

          const response = await fetch(`/api/users/${profileId}/posts`);
          
          const data = await response.json();

          setPosts(data);

          
        }

        if(session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        // navigate user to an editable page
        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })
                // updating the state
                const filteredPosts = posts.filter((p) => p._id != post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }


  return (
    <Profile 
        name= {isUserProfile? "My" : `${(userName)}'s`}
        desc="Welcome to your personlized profile page"
        data={posts}
        handleEdit = {isUserProfile && handleEdit}
        handleDelete = {isUserProfile && handleDelete}
    />
  )
}

export default MyProfile