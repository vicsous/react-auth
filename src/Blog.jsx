import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getPosts } from "./store/blogSlice";

export default function Blog () {
    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');

    const user = useSelector(state => state.user)
    
    var newBlogPost = {}

    const dispatch = useDispatch();

    const { posts, status, error } = useSelector(state => state.blog)

    const handleNewPost = () => {
        if (!user.isLogged) return alert('No user logged.');
        newBlogPost = { author: user.username, text, title };
        dispatch(addNewPost(newBlogPost));
    }

    return (
    <div>
        <h1>Blog</h1>
        <h1>New post</h1>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value) }></input>
        <input type="text" placeholder="Content..." onChange={(e) => setText(e.target.value) }></input>
        <button onClick={handleNewPost}>NewPost</button>
        <p>
            <button onClick={() => dispatch(getPosts())}>Get posts</button>
        </p>
        {status === 'loading' ? 
        <p>Loading...</p> : 
        posts?.map(post => {
            return <p key={post.id}>{post.title}</p>
        })}
        {status === 'failed' ? 
        <p>errrrrrrr</p> :
        <></>
        }
   </div>
    )
}