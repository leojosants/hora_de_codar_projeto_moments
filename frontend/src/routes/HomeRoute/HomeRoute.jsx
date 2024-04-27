import axios from '../../axios/axiosConfig';

import {
    useState, useEffect
} from 'react';

import {
    Link
} from 'react-router-dom';

import './HomeRoute.css';

const Home = () => {
    const [
        memories, setMemories
    ] = useState([]);

    useEffect(
        () => {
            const getMemories = async () => {
                const res = await axios.get('/memories');
                const data = res.data;
                setMemories(data);
            };
            getMemories();
        }, []
    );

    return (
        <div className='class-home'>
            <h2>
                Confira as últimas Memórias.
            </h2>

            <div className='class-memories-container'>
                {
                    memories.length > 0 && memories.map(
                        (memory) => (
                            <div
                                className='class-memory'
                                key={memory._id}
                            >
                                <img
                                    src={`${axios.defaults.baseURL}${memory.src}`}
                                    alt={memory.title}
                                />

                                <p>
                                    {memory.title}
                                </p>

                                <Link
                                    className='class-button'
                                    to={`/memories/${memory._id}`}
                                >
                                    Comentar
                                </Link>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Home;