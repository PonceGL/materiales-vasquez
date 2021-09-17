import React from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";

// Components
import Branch from "../components/Branch/Branch";

// Styled-Components
import { MainStiled } from "../styles/sucursales/style";

// Data-Test
const branches = [
  {
    branch: "Lázaro Cárdenas",
    address:
      "Av. Lázaro Cárdenas N.274 Col. Encinal c.p 91180 Xalapa, Veracruz, México.",
    photo:
      "https://res.cloudinary.com/duibtuerj/image/upload/v1630682519/brand/tiendas/L%C3%A1zaro-C%C3%A1rdenas.jpg",
    phone: "2288401919",
    extent: ["838", "839"],
    email: "ventas.sucursal@grupovasquez.com.mx",
    hours: ["8:00", "19:30", "15:00"], // Apertura - Cierre - Cierre Sabados
    location: "https://goo.gl/maps/CS4JgsBKMByXvEHt5",
  },
  {
    branch: "Home Center",
    address:
      "Av. Lázaro Cárdenas N.13 Col. Badillo c.p 91180 Xalapa, Veracruz, México.",
    photo:
      "https://res.cloudinary.com/duibtuerj/image/upload/v1630682602/brand/tiendas/Home-Center.jpg",
    phone: "2288401919",
    extent: ["855"],
    email: "caja.homecenter@grupovasquez.com.mx",
    hours: ["9:00", "20:00", "18:00"], // Apertura - Cierre - Cierre Sabados
    location: "https://goo.gl/maps/DmzzzyJgNedggcHWA",
  },
  {
    branch: "Banderilla",
    address:
      "Boulevard Xalapa-Banderilla k.m 5. Col. Centro c.p 91300 Banderilla, Veracruz. México.",
    photo:
      "https://res.cloudinary.com/duibtuerj/image/upload/v1630682646/brand/tiendas/Banderilla.jpg",
    phone: "2288401919",
    extent: ["853"],
    email: "erreteria_banderilla@grupovasquez.com.mx",
    hours: ["8:00", "19:00", "15:00"], // Apertura - Cierre - Cierre Sabados
    location: "https://goo.gl/maps/dUS5r4sraKLZQsA49",
  },
  {
    branch: "Margarita Olivo",
    address:
      "Margarita Olivo N.15 Col. Rafael Lucio c.p 91110 Xalapa, Veracruz, México.",
    photo:
      "https://res.cloudinary.com/duibtuerj/image/upload/v1630682681/brand/tiendas/Margarita-Olivo.jpg",
    phone: "2288401919",
    extent: ["828"],
    email: "recepcion@grupovasquez.com.mx",
    hours: ["8:00", "19:00", "15:00"], // Apertura - Cierre - Cierre Sabados
    location: "https://goo.gl/maps/fmwY4dVusMrRGycV6",
  },
  {
    branch: "Castillo",
    address: "Carretera Xalapa - El Castillo N.2615 Xalapa, Veracruz, México.",
    photo:
      "https://res.cloudinary.com/duibtuerj/image/upload/v1630682744/brand/tiendas/Castillo.jpg",
    phone: "2288401919",
    extent: ["893"],
    email: "ventas.castillo@grupovasquez.com.mx",
    hours: ["8:00", "19:00", "15:00"], // Apertura - Cierre - Cierre Sabados
    location: "https://goo.gl/maps/Xx6unGF2MXpz4Rnb7",
  },
  {
    branch: "Revolución",
    address:
      "Av. Atenas Veracruzana N.1906 Col. Revolución CP.91100 Xalapa, Veracruz, México.",
    photo:
      "https://res.cloudinary.com/duibtuerj/image/upload/v1630682787/brand/tiendas/Revoluci%C3%B3n.jpg",
    phone: "2288401919",
    extent: ["863"],
    email: "cotiza.mundo@grupovasquez.com.mx",
    hours: ["8:00", "19:00", "15:00"], // Apertura - Cierre - Cierre Sabados
    location: "https://goo.gl/maps/UDum4sLi7jyuTm7W7",
  },
];

const Sucursales = () => {
  return (
    <>
      <NextSeo
        title="Sucursales | Materiales Vasquez Hermanos"
        description={`¡Contamos con ${branches.length} sucursales para estar cerca de ti, visítanos!`}
        canonical="https://www.materialesvasquezhnos.com.mx/sucursales"
        openGraph={{
          url: "https://www.materialesvasquezhnos.com.mx/sucursales",
          title: "Sucursales | Materiales Vasquez Hermanos",
          description: `¡Contamos con ${branches.length} sucursales para estar cerca de ti, visítanos!`,
          images: [
            {
              url: "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
              width: 200,
              height: 200,
              alt: "Logotipo de Materiales Vasquez Hermanos",
            },
          ],
          site_name: "Materiales Vasquez Hermanos",
        }}
        twitter={{
          handle: "@MaterialesVH",
          site: "@MaterialesVH",
          cardType: "summary",
        }}
      />
      <LocalBusinessJsonLd
        type="HomeGoodsStore"
        name="Sucursales | Materiales Vasquez Hermanos"
        description={`¡Contamos con ${branches.length} sucursales para estar cerca de ti, visítanos!`}
        url="https://www.materialesvasquezhnos.com.mx/sucursales"
        telephone="+522288401919"
        address={{
          streetAddress: "Lázaro Cárdenas 274",
          addressLocality: "Xalapa",
          addressRegion: "MEX",
          postalCode: "91180",
          addressCountry: "MX",
        }}
      />
      <MainStiled>
        {branches.map((store) => (
          <Branch key={store.address} {...store} />
        ))}
      </MainStiled>
    </>
  );
};

export default Sucursales;