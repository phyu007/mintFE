import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllMints } from '../api/mintAPIs'; // Replace 'yourApiFile' with the correct path

interface Mint {
  mintId: number;
  name: string;
  description: string;
  image: string;
}

class MintListComponent extends Component {
  state = {
    mintItems: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await getAllMints();
      console.log("Response:", response);
      this.setState({ mintItems: response.data });
    } catch (error) {
      console.error('Error fetching mints:', error);
    }
  };

  render() {
    return (
      <div className="mint-grid-container">
        {this.state.mintItems.map(({ mintId, name, description, image }) => (
          <div className="mint-item" key={mintId}>
            <Link to={`/detail?uuid=${mintId}`}>
              <img src={image} alt={name} className="mint-image" />
            </Link>
            <div className="mint-details">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MintListComponent;
