import React, { useState } from 'react';
import { createMint } from '../api/mintAPIs';
import { toast } from "react-toastify";

const CreateMint = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

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
        console.log('Mint created:', mintData);
        try {
            const response = await createMint(mintData);
            toast("Mint created successfully!")
            console.log('Mint created:', response);
        } catch (error) {
            toast("Error creating mint!")
            console.error('Error creating mint:', error);

        };

        // Clear the form fields after submission
        setName('');
        setDescription('');
        setImage('');
    }

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
                <br />
                <label>
                    Image:
                    <input type="text" value={image} onChange={handleImageChange} />
                </label>
                <br />
                <button type="submit">Post Mint</button>
            </form>
        );
    };

export default CreateMint;
