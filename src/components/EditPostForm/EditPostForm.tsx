import React, { useState, useEffect } from 'react';
import axiosApi from '../../axiosApi.ts';
import { Quote } from '../../type';
import AddPostForm from "../AddPostForm/AddPostForm.tsx";
import { useParams, useNavigate } from 'react-router-dom';

interface Props {
    onQuoteUpdated: (updatedQuote: Quote) => void;
}

const EditPostForm: React.FC<Props> = ({ onQuoteUpdated }) => {
    const { id } = useParams();
    const [quote, setQuote] = useState<Quote | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuoete = async () => {
            try {
                const response = await axiosApi.get(`/quotes/${id}.json`);
                const quoteData = response.data;
                const quoteDetails: Quote = quoteData ? { id, ...quoteData } : null;
                setQuote(quoteDetails);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchQuoete();
    }, [id]);

    const handleUpdateQuote = async (updatedQuote: Quote) => {
        try {
            await axiosApi.put(`/quotes/${id}.json`, updatedQuote);
            onQuoteUpdated(updatedQuote);
            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="container mt-5">
            {quote ? (
                <>
                    <h2>Edit Post</h2>
                    <AddPostForm
                        initialData={{ title: quote.title, content: quote.content }}
                        onQuoteSubmit={handleUpdateQuote()}
                        isEditMode
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditPostForm;

