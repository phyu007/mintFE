import React, { useState } from 'react';
import { createMint } from '../api/mintAPIs';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const CreateMint = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const mintData = {
            name: name,
            description: description,
            image: image,
        };

        setIsLoading(true);

        try {
            const response = await createMint(mintData);
            console.log('Mint created:', response);
            setSuccessMessage('Mint created successfully!');
            // Redirect to home page after a short delay (e.g., 2 seconds)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error creating mint:', error);
        } finally {
            setIsLoading(false);
        }

        setName('');
        setDescription('');
        setImage('');
    };

    return (
        <div className="form" >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                <div>
                    <span>Enter details...</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={4}>
                            <label>Name</label>
                        </Grid>
                        <Grid item xs={8}>
                            <input type="text" value={name} onChange={handleNameChange} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <label>Description</label>
                        </Grid>
                        <Grid item xs={8}>
                            <input type="text" value={description} onChange={handleDescriptionChange} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <label>Image</label>
                        </Grid>
                        <Grid item xs={8}>
                            <input type="text" value={image} onChange={handleImageChange} />
                            <span style={{ color: '#888', fontSize: '12px' }}>Paste the public image URL here</span>
                        </Grid>
                    </Grid>

                    <button disabled={isLoading} type="submit" style={submitButtonStyle}>
                        {isLoading ? (
                            <>
                                <CircularProgress color="inherit" variant="indeterminate" size="1rem" />{' '}
                                {' '}
                            </>
                        ) : (
                            ''
                        )}
                        Post Mint
                    </button>
                </form>
            </div>
        </div>
    );
};

const submitButtonStyle = {
    minWidth: '90px',
    maxWidth: '120px',
    fontSize: '14px',
    padding: '5px',
};

export default CreateMint;
