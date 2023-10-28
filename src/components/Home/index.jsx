// Archivo Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { routes } from '../../routes/routes';

export default function Home() {
    return (
        <div className='contenedor-apps'>
            {routes.slice(1).map((route, index) => (
                <div className="aeropuerto-link" key={index}>
                    <Link to={route.path}>
                        <img src={route.img_path} alt={`${route.text}`} />
                        <p>{route.text}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};
