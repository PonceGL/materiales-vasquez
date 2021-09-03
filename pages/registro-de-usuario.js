import React, { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";
import { signIn, getProviders, getSession } from "next-auth/client";

// Components
import Slider from "../components/Slider/Slider";

// Styles
import styles from "../styles/components/Main.module.css";

// Styled-Components
import {
  SectionStyled,
  Container,
  Text,
  ButtonLogIn,
  SpanStyles,
} from "../styles/registro-de-usuario/style";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: `/perfil-de/${session.user.name.replace(/ /gi, "-")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers,
      title: `Registro de usuario | Materiales Vasquez Hermanos`,
      description:
        "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
      image:
        "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
      ogurl: "https://www.materialesvasquezhnos.com.mx",
    },
  };
};

const HomePage = (props) => {
  const { providers, title } = props;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width user-scalable=no"
        />

        <meta
          name="description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar."
          key="descriptionIndex"
        />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Registro de usuario | Materiales Vasquez Hermanos"
          key="og:titleIndex"
        />
        <meta
          property="og:description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar."
          key="og:descriptionIndex"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
          key="og:imageIndex"
        />
        <meta
          property="og:url"
          content="https://www.materialesvasquezhnos.com.mx/registro-de-usuario"
          key="og:urlIndex"
        />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Registro de usuario | Materiales Vasquez Hermanos"
          key="twitter:titleIndex"
        />
        <meta
          name="twitter:description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar."
          key="twitter:descriptionIndex"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
          index="twitter:imageIndex"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeGoodsStore",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Xalapa, Veracruz, México",
                addressRegion: "MEX",
                postalCode: "91180",
                streetAddress: "Lázaro Cárdenas 274",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4",
                reviewCount: "250",
              },
              name: "Materiales Vasquez Hermanos",
              description:
                "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
              openingHours: ["Mo-Sa 08:00-19:30", "Sa 08:00-15:00"],
              priceRange: "$1, $15000",
              currenciesAccepted: "MXN",
              paymentAccepted: "Cash, Credit Card",
              telephone: "(228) 840-1919",
              email: "mailto:ventas.sucursal@grupovasquez.com.mx",
              url: "https://www.materialesvasquezhnos.com.mx/",
            }),
          }}
        />

        <title>{title}</title>
      </Head>

      <main className={styles.MainStyle}>
        <h1>Registro de usuario</h1>
        <SectionStyled>
          <Container>
            <Text>Aún no está registrado</Text>
            <Text>Regístrese en menos de dos minutos</Text>
          </Container>
          <Container>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <ButtonLogIn
                  type="button"
                  onClick={() => signIn(provider.id)}
                  color={provider.id === "google" ? "#DB4437" : "#4267B2"}
                >
                  Acceder con <SpanStyles>{provider.name}</SpanStyles>
                </ButtonLogIn>
              </div>
            ))}
          </Container>
        </SectionStyled>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsIliked: state.itemsIliked,
    itemsLoaded: state.itemsLoaded,
  };
};

export default connect(mapStateToProps, null)(HomePage);