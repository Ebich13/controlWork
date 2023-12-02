import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from "../../axiosApi.ts";

const CategoryQuotes = () => {
    const { category } = useParams();
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const fetchCategoryQuotes = async () => {
            try {
                const response = await axiosApi.get(`/quotes.json?orderBy="category"&equalTo="${category}"`);
                const data = response.data;
                const quotesArray = data ? Object.values(data) : [];
                setQuotes(quotesArray);
            } catch (error) {
                console.error(`Error fetching ${category} quotes:`, error);
            }
        };

        fetchCategoryQuotes();
    }, [category]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{category} Цитаты</h1>
            <ul className="list-group">
                {quotes.map((quote) => (
                    <li key={quote.id} className="list-group-item">
                        {quote.text} - {quote.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryQuotes;
