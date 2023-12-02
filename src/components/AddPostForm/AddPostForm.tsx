import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from "../../axiosApi.ts";


const QuoteForm = ({ isEditMode }) => {
    const { id } = useParams();
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Star Wars');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axiosApi.get(`/quotes/${id}.json`);
                const data = response.data;
                setAuthor(data.author);
                setText(data.text);
                setCategory(data.category);
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        if (isEditMode) {
            fetchQuote();
        }
    }, [id, isEditMode]);

    const handleSubmit = async () => {
        const quote = { author, text, category };

        try {
            if (isEditMode) {
                await axiosApi.put(`/quotes/${id}.json`, quote);
            } else {
                await axiosApi.post('/quotes.json', quote);
            }
            navigate('/');
        } catch (error) {
            console.error('Error submitting quote:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>{isEditMode ? 'Редактировать цитату' : 'Добавить новую цитату'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Автор:</label>
                    <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Текст цитаты:</label>
                    <textarea className="form-control" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Категория:</label>
                    <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Star Wars">Star Wars</option>
                        <option value="Famous people">Famous people</option>
                        <option value="Saying">Saying</option>
                        <option value="Humour">Humour</option>
                        <option value="Motivational">Motivational</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    {isEditMode ? 'Редактировать' : 'Сохранить'}
                </button>
            </form>
        </div>
    );
};

export default QuoteForm;






