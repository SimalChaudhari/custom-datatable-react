import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  return (
    <div>
      <ul>
        <li><Link to="/Table">Table</Link></li>
      </ul>
      <hr />
    </div>
  );
};

export default Home;
