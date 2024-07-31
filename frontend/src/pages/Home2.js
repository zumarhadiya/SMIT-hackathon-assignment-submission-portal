
import Navbar from '../components/Navbar';

import { Link } from 'react-router-dom';


function Home2() {
    return (
        <div>
            <Navbar />
            {/* <ClickableContainer/> */}
            <section className="hero-section">
                <h1>Select course to post assignment</h1>
            <Link to="/dashboard1">
            <div className='container' >
                    <h2>Web And App Development</h2>
                </div>
                </Link>

                <Link to="/dashboard2">
                <div className='container'>
                    <h2>Graphic Designing</h2>
                </div>
                </Link>
                <Link to="/dashboard3">
                <div className='container'>
                    <h2>Ai & chatbot</h2>
                </div>
                </Link>
            </section>

           
        </div>
    )
}

export default Home2
{/* {
    products && products?.map((item, index) => (
        <ul key={index}>
            <span>{item.name} : {item.price}</span>
        </ul>
    ))
} */}
