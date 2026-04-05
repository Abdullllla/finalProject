import React ,{useContext} from 'react';
import styles from './Brands.module.css'
 import { counterContext } from '../../Context/Counter';
import { Helmet } from 'react-helmet';

const Brands = () => {
  let {counter, increase} = useContext(counterContext)
  return (
    <>
       <Helmet>
        <title>Home Page</title>
      </Helmet>

    <h2> Brands {counter}</h2>
    <button onClick={increase} className='btn btn-danger'>Click</button> 
    </>
  );
}

export default Brands
