import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from 'react-router-dom';
import { getAllMints } from '../api/mintAPIs'; // Replace 'yourApiFile' with the correct path

interface Mint {
    mintId : number;
    name: string;
    description: string;
    image:string;
  }
  
// interface MintItems {
//     mintItems: Mint[]
// }

const MintListComponent = () => {
    // const navigate = useNavigate();
    const [mintItems, setMints] = useState<Mint[]>([]);

    // const handleRowClick = (mintId:number) => {
    //     navigate(`/mints?uuid=${mintId}`);
    //     console.log("Clicked on mint with id:", mintId);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {              
                const response = await getAllMints();

                console.log("Response:", response)
                setMints(response.data); // Assuming your API response is an array of mints
            } catch (error) {
                console.error('Error fetching mints:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <TableContainer style={{ maxWidth: "550px" }}>
                <Table>
                    <TableHead>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Image URL</TableCell>
                    </TableHead>

                    <TableBody>
                        { mintItems.map(({mintId, name, description, image}) => (
                            <TableRow>
                                <TableCell align="left" width="50">{mintId}</TableCell>
                                <TableCell align="left"><Link to={`/detail?uuid=${mintId}`}>{name}</Link></TableCell>
                                <TableCell align="left">{description}</TableCell>
                                <TableCell align="left" style={imgURLStyle} >{image}</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MintListComponent;

const imgURLStyle = { 
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}

const hardCodedItems = [
    {
      mintId : 1,
      name: 'test',
      description: 'test description',
      image: 'https://github.com/remix-run/react-router/blob/dev/examples/basic/src/App.tsx'
    },
    {
        mintId : 2,
        name: 'test',
        description: 'test2 description',
        image: 'https://github.com/remix-run/react-router/blob/dev/examples/basic/src/App.tsx'
    },
    {
        mintId : 441,
        name: 'test',
        description: 'test3 description',
        image: 'https://github.com/remix-run/react-router/blob/dev/examples/basic/src/App.tsx'
    },
    {
        mintId : 12,
        name: 'test12',
        description: 'test12 description',
        image: 'https://github.com/remix-run/react-router/blob/dev/examples/basic/src/App.tsx'
    },
]
  