import React, { useState } from 'react';
import { createMint } from '../api/mintAPIs';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const CreateMint = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    };

    const handleSubmit = async(e: React.FormEvent) => {

        e.preventDefault();

        // Perform the mint posting logic here
        const mintData = {
            name: name,
            description: description,
            image: image
        };
        setIsLoading(true)
        console.log('Mint created:', mintData);
        try {
            const response = await createMint(mintData);
            console.log('Mint created:', response);
        } catch (error) {
            console.error('Error creating mint:', error);
        } finally {
            setIsLoading(false)
        }

        // Clear the form fields after submission
        setName('');
        setDescription('');
        setImage('');
    }

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: '10px'
            }}>
                <div><span>Enter details...</span></div>

                <form onSubmit={handleSubmit} style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "300px",
                    gap: "10px"
                }}>
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
                        </Grid>
                    </Grid>
                    
                    <button disabled={isLoading} type="submit" style={submitButtonStyle}>
                        { isLoading ? (<><CircularProgress color="inherit" variant="indeterminate" size="1rem" /> {" "}</>) : '' }
                        Post Mint
                    </button>

                </form>
            </div>
        );
    };

export default CreateMint;



const submitButtonStyle = {
    minWidth: "90px",
    maxWidth: "120px",
    fontSize: "14px",
    padding: "5px"
}