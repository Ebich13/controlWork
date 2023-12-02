import React from "react";
import Navigation from './components/Navigation/Navigation.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './container/Home/Home.tsx';
import AddPostPage from "./container/AddPostPage/AddPostPage.tsx";
import PostDetails from "./components/PostDetailPage/PostDetailPage.tsx";
import EditPostForm from "./components/EditPostForm/EditPostForm.tsx";


function App() {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main className="container-fluid">
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/add" element={<AddPostPage />} />
                        <Route path="/posts/:id/edit" element={<EditPostForm />} />
                    </Routes>
                </div>
            </main>
        </>
    );
}

export default App;
