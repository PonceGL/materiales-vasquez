import React, { useState, useEffect } from "react";
const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../lib/config-cosmos";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";

// Data
import { articulos } from "../database/articulos";

// Components
import Slider from "../components/Slider/Slider";
import HomeSection from "../components/Home-Sections/index";

import HomeFavorites from "../components/Home-Favorites/HomeFavorites";

// Styles
import { MainStyled, Section, TitleSection } from "../styles/Inicio/style";

// g.DESGIR = 'LO MÁS VENDIDOS'
// g2.DESC_GIR2 = 'ILUMINACION'
// g.DESGIR = 'FERRETERIA'
// g2.DESC_GIR2 = 'PUERTAS Y VENTANAS'
// g2.DESC_GIR2 = 'VENTILACION Y CALEFACCIÓN'

const HomePage = () => {
  // const [articulos, setArticulos] = useState([]);
  // const [SlidersItems, setSlidersItems] = useState([]);
  const [BestSellers, setBestSellers] = useState([]);
  const [LightingItems, setLightingItems] = useState([]);
  const [DoorsItems, setDoorsItems] = useState([]);
  const [FerrItems, setFerrItems] = useState([]);
  const [VentilationItems, setVentilationItems] = useState([]);

  // useEffect(async () => {
  //   // Solicita los sliders
  //   const response = await fetch(`/api/slider`);
  //   const { data } = await response.json();

  //   setSlidersItems(data);
  // }, []);

  useEffect(() => {
    if (articulos.length > 0) {
      // const items = articulos.filter((item) => item.best_seller);
      const items = articulos.filter(
        (item) => item.category === "LO MÁS VENDIDOS"
      );

      const lightingArticles = articulos.filter(
        (item) => item.main_category === "ILUMINACION"
      );
      const ferr = articulos.filter((item) => item.category === "FERRETERIA");

      const doorsItems = articulos.filter(
        (item) => item.main_category === "PUERTAS Y VENTANAS"
      );

      const ventilationItems = articulos.filter(
        (item) => item.main_category === "VENTILACION Y CALEFACCIÓN"
      );

      setBestSellers(items);
      setLightingItems(lightingArticles);
      setDoorsItems(doorsItems);
      setFerrItems(ferr);
      setVentilationItems(ventilationItems);
    }
  }, [articulos]);

  return (
    <MainStyled>
      {/* {SlidersItems.length > 0 && <Slider sliderItems={SlidersItems} />} */}
      <Slider />
      {articulos.length === 0 && <p>Consultando...</p>}

      <HomeFavorites />
      {BestSellers.length > 0 && (
        <Section>
          <TitleSection>PRODUCTOS MÁS VENDIDOS</TitleSection>
          <HomeSection data={BestSellers} />
        </Section>
      )}
      {LightingItems.length > 0 && (
        <Section>
          <TitleSection>ILUMINACIÓN</TitleSection>
          <HomeSection data={LightingItems} />
        </Section>
      )}
      {FerrItems.length > 0 && (
        <Section>
          <TitleSection>FERRETERIA</TitleSection>
          <HomeSection data={FerrItems} />
        </Section>
      )}
      {DoorsItems.length > 0 && (
        <Section>
          <TitleSection>PUERTAS Y VENTANAS</TitleSection>
          <HomeSection data={DoorsItems} />
        </Section>
      )}
      {VentilationItems.length > 0 && (
        <Section>
          <TitleSection>VENTILACIÓN Y CALEFACCIÓN</TitleSection>
          <HomeSection data={VentilationItems} />
        </Section>
      )}
    </MainStyled>
  );
};

export default HomePage;
