import React from 'react';
import AddPostForm from "../../components/AddPostForm/AddPostForm.tsx";
import { Post } from "../../type";

interface Props {
    onPostAdded: (newPost: Post) => void;
}

const AddPostPage: React.FC<Props> = ({ onPostAdded }) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add New Post</h2>
            <AddPostForm onPostAdded={onPostAdded}/>
        </div>
    );
};

export default AddPostPage;


