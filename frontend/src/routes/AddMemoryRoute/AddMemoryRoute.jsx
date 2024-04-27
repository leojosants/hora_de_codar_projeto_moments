import axios from '../../axios/axiosConfig';

import {
    useState
} from 'react';

import {
    toast
} from 'react-toastify'

import {
    useNavigate
} from 'react-router-dom';

import './AddMemoryRoute.css';

const AddMemory = () => {
    const [
        inputs, setInputs
    ] = useState({});

    const [
        image, setImage
    ] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);

        try {
            const response = await axios.post(
                '/memories',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            const data = response.data;
            toast.success(data.msg);
            navigate('/');
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    const handleChange = (event) => {
        const eventTargetName = event.target.name;
        const eventTargetValue = event.target.value;
        const isEventTargetNameImage = (eventTargetName === 'image');

        if (isEventTargetNameImage) {
            const file = event.target.files[0];
            setImage(file);
        }
        else {
            setInputs(
                {
                    ...inputs,
                    [eventTargetName]: eventTargetValue
                }
            );
        }
    };

    return (
        <div className='class-add-memory-page'>
            <h2>
                Crie uma nova memória
            </h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <p>
                        Título
                    </p>

                    <input
                        type='text'
                        name='title'
                        placeholder='Digite o título...'
                        onChange={(event) => handleChange(event)}
                    />
                </label>

                <label>
                    <p>
                        Descrição
                    </p>

                    <textarea
                        name='description'
                        placeholder='Explique o que aconteceu...'
                        onChange={(event) => handleChange(event)}
                    ></textarea>
                </label>

                <label>
                    <p>
                        Foto
                    </p>

                    <input
                        type='file'
                        name='image'
                        onChange={(event) => handleChange(event)}
                    />
                </label>

                <input
                    className='class-button'
                    type='submit'
                    value='Enviar'
                />
            </form>
        </div>
    );
};

export default AddMemory;