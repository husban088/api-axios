import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import AddPost from './components/addPost';
import Post from './components/post';
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  
  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
  });
  
  const fetchPosts = async() => {
    const response = await client.get('?_limit=4');
    setPosts(response.data);
  }
 
 useEffect(() => {
      fetchPosts()
   }, []);
   
  const addPost = async(title, body) => {
    const response = await client.post('', {
      title,
      body
    });
    setPosts((prevPosts) => [response.data, ...prevPosts]);
  };
   
  const deletePost = async(id) => {
    const response = await client.delete(`${id}`);
    setPosts(posts.filter((post) => {
      return post.id !== id;
    }))
  };
   
  return (
    <main>
    <h1>Consuming REST api tutorial</h1>
      <AddPost addPost={addPost}/>
      <section className="posts-container">
      <h2 className='post__text'>Posts</h2>
        {posts.map((post) => 
          <Post 
            key={post.key} 
            id={post.id}
            title={post.title} 
            body={post.body} 
            deletePost={deletePost}
          />
        )}
      </section>
   </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 

/*
  AXIOS docs
  https://axios-http.com/docs/intro
 */

   /* 
  CHALLENGE:
  rewrite the code, creating the axios client instance and 
  filling in the fetchPost function to use axios client.get
  
  the base url is: "https://jsonplaceholder.typicode.com/posts"
  the extension string is: "?_limit=4"
 */