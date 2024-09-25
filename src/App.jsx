import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Comments from '@/pages/Comments/Comments';
import Header from '@/modules/Header/Header';

function App() {
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    function onScroll() {
        localStorage.setItem('scrollPositionY', window.scrollY);
    }

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/comments" element={<Comments />} />
                    <Route path="*" element={<Navigate to={'/comments'} />} />
                </Routes>
            </main>
        </>
    )
}

export default App;
