// PostDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';
import { Post } from '../../type';
import EditPostForm from '../../components/EditPostForm/EditPostForm';



const PostDetails: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosApi.get(`/posts/${id}.json`);
                const postData = response.data;
                const postDetails: Post = postData ? { id, ...postData } : null;
                setPost(postDetails);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleDeletePost = async () => {
        try {
            await axiosApi.delete(`/posts/${id}.json`);
          navigate('/');

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEditClick = () => {
        setEditFormOpen(true);
    };

    const handleEditFormClose = () => {
        setEditFormOpen(false);
    };

    return (
        <div className="container mt-5">
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p className="text-muted">{post.date}</p>
                    <p>{post.content}</p>
                    <button className="btn btn-primary mr-2" onClick={handleEditClick}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={handleDeletePost}>
                        Delete
                    </button>

                    {isEditFormOpen && (
                        <EditPostForm postId={id} onPostUpdated={(updatedPost) => setPost(updatedPost)} onClose={handleEditFormClose} />
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetails;


