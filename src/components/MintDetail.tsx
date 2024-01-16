import React, { useEffect, useState } from 'react';
import { getMintDetails } from '../api/mintAPIs'; // Replace 'yourApiFile' with the correct path
import { useLocation } from 'react-router-dom';
import '../styles/stylesheet.css';

interface MintDetailProps {
    id: string;
}

interface Mint {
    uuid : number;
    id: number;
    name: string;
    description: string;
    image : string
}

const MintDetail: React.FC<MintDetailProps> = () => {
    const [mintDetail, setMintDetail] = useState<Mint>();
    const location = useLocation();
    const myParam = new URLSearchParams(location.search).get('uuid');

    console.log("myParam:", myParam);

    useEffect(() => {
        const fetchMintDetail = async () => {
            try {
                const response = await getMintDetails(myParam); // Replace with your API endpoint
                console.log("mint detail:", response)
                setMintDetail(response.data[0]);
            } catch (error) {
                console.error('Error fetching mint detail:', error);
            }
        };

        fetchMintDetail();
    }, []);

    if (!mintDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{mintDetail.name}</h2>
            <p>{mintDetail.description}</p>
            <img className="photo" src={mintDetail.image} alt={mintDetail.name} />
        </div>
    );
};

export default MintDetail;