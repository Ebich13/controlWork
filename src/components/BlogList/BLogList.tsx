import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';
import { Quote } from '../../type';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    posts: Quote[];
}

const BlogList: React.FC<Props> = () => {
    const [posts, setPosts] = useState<Quote[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosApi.get('/quotes.json');
                const data = response.data;
                const postsArray: Quote[] = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
                setPosts(postsArray);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Blog</h2>
            <ul className="list-group">
                {posts.map((post) => (
                    <li key={post.id} className="list-group-item">
                        <h3 className="mb-3">{post.title}</h3>
                        <p className="text-muted mb-2">{post.date}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary mr-2">
                            Read moore
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
