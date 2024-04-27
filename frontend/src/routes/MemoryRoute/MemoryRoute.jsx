import axios from '../../axios/axiosConfig';

import {
    useState, useEffect
} from 'react';

import {
    useParams
} from 'react-router-dom';

import {
    toast
} from 'react-toastify'

import './MemoryRoute.css';

const Memory = () => {
    const {
        id
    } = useParams();

    const [
        memory, setMemory
    ] = useState(null);

    const [
        comments, setComments
    ] = useState([]);

    useEffect(
        () => {
            const getMemory = async () => {
                const res = await axios.get(`/memories/${id}`);
                const data = res.data;
                const comments = res.data.comments;
                setMemory(data);
                setComments(comments);
            };
            getMemory();
        }, [id]
    );

    const [
        name, setName
    ] = useState('');

    const [
        text, setText
    ] = useState('');

    if (!memory) {
        return (
            <p>
                Carregando...
            </p>
        );
    }

    const clearForm = () => {
        setName('');
        setText('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const comment = {
                name, text
            };

            const res = await axios.patch(
                `/memories/${memory._id}/comment/`,
                comment
            );

            const lastComment = res.data.memory.comments.pop();

            setComments(
                (comments) => [
                    ...comments,
                    lastComment
                ]
            );

            clearForm();
            toast.success(res.data.msg);
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <div className='class-memory-page'>
            <img
                src={`${axios.defaults.baseURL}${memory.src}`}
                alt={memory.title}
            />

            <h2>
                {memory.title}
            </h2>

            <p>
                {memory.description}
            </p>

            <div className='class-comment-form'>
                <h3>
                    Envie o seu comentário.
                </h3>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <label>
                        <input
                            type='text'
                            placeholder='Adicione o comentário...'
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                    </label>

                    <label >
                        <textarea
                            placeholder='Seu comentário...'
                            onChange={(event) => setText(event.target.value)}
                            value={text}
                        ></textarea>
                    </label>

                    <input
                        className='class-button'
                        type='submit'
                        value='Enviar'
                    />
                </form>
            </div>

            <div className='class-comments-container'>
                <h3>
                    Comentários ({comments.length})
                </h3>

                {
                    comments.length === 0 && (
                        <p>
                            Não há comentários...
                        </p>
                    )
                }

                {
                    comments.length > 0 && (
                        comments.map(
                            (comment) => (
                                <div
                                    className='class-comment'
                                    key={comment._id}
                                >
                                    <p className="class-comment-name">
                                        {comment.name}
                                    </p>

                                    <p className="class-comment-text">
                                        {comment.text}
                                    </p>
                                </div>
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Memory;