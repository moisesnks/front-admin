// routes.js
import Home from '../pages/Home';
import Aeropuertos from '../pages/Aeropuertos';
import Ciudades from '../pages/Ciudades';
import Paises from '../pages/Paises';
import Paquetes from '../pages/Paquetes';
import Imagenes from '../pages/Imagenes';
import Facturas from '../pages/Facturas';
import Usuarios from '../pages/Usuarios';

export const routes = [
    { path: "/", component: Home, img_path: "/icons/home.svg", text: "Inicio" },
    { path: "/aeropuertos", component: Aeropuertos, img_path: "/icons/flight.svg", text: "Aeropuertos" },
    { path: "/ciudades", component: Ciudades, img_path: "/icons/city.svg", text: "Ciudades" },
    { path: "/paises", component: Paises, img_path: "/icons/flag.svg", text: "Paises" },
    { path: "/paquetes", component: Paquetes, img_path: "/icons/travel.svg", text: "Paquetes" },
    { path: "/imagenes", component: Imagenes, img_path: "/icons/gallery.svg", text: "Imágenes" },
    { path: "/facturacion", component: Facturas, img_path: "/icons/bill.svg", text: "Facturacion" },
    { path: "/usuarios", component: Usuarios, img_path: "/icons/user.svg", text: "Usuarios" },

];
