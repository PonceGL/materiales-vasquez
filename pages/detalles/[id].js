import { useState, useEffect } from "react";
import Image from "next/image";
import { useGetStock } from "../../hooks/useGetStock";
import { useRouter } from "next/router";
import { useGetImage } from "../../hooks/useGetImage";
import { useGetPrice } from "../../hooks/useGetPrice";

// Components
import { Loading } from "../../components/Loaders/Loading";
import { Consulting } from "../../components/Loaders/Consulting";
import RelatedSecction from "../../components/Related-Secction/RelatedSecction";

// Data
import { articulos } from "../../database/articulos";

// Styled-Components
import {
  MainStyled,
  SubDirectory,
  Product,
  ImageContainer,
  Title,
  PriceContainer,
  Price,
  Stock,
  InfoContainer,
  Description,
  Sku,
  RelatedSection,
} from "../../styles/detalles/style";

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ProductDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState({});
  const [infoReady, setInfoReady] = useState(false);
  const [image_url] = useGetImage(id || "");
  const [stock] = useGetStock(id || "");
  const [price] = useGetPrice(id || "");
  // Relacionados
  const [relatedByName, setRelatedByName] = useState([]);
  const [relatedByCategory, setRelatedByCategory] = useState([]);

  useEffect(() => {
    id === undefined && setInfoReady(false);
  }, [id]);

  useEffect(() => {
    if (articulos.length > 0 && id) {
      const data = articulos.filter((item) => item.articulo_id === id);
      setProduct(data[0]);
      setInfoReady(true);
    }
  }, [id]);

  useEffect(() => {
    // Solicita articulos relacionados por nombre
    if (image_url !== "" && product !== {}) {
      const name = product.name.split(" ")[0];
      const data = articulos.filter(
        (item) => item.name.includes(name) && item.name !== product.name
      );
      setRelatedByName(data.slice(0, 12));
    }
  }, [id, product, image_url]);

  useEffect(() => {
    // Solicita articulos relacionados por categoria
    if (image_url !== "" && product !== {}) {
      const category = product.category;
      const data = articulos.filter((item) => item.category === category);
      setRelatedByCategory(data.slice(0, 12));
    }
  }, [id, product, image_url]);

  return (
    <MainStyled>
      {infoReady ? (
        <>
          <Title>{product.name.toLowerCase()}</Title>
          <SubDirectory>
            <p>
              /categoria/{product.category.replace(/ /gi, "-").toLowerCase()}/
              {product.main_category &&
                product.main_category.replace(/ /gi, "-").toLowerCase()}
            </p>
          </SubDirectory>
          <Product>
            <ImageContainer>
              {image_url !== "" ? (
                <Image
                  loader={loader}
                  src={`data:image/jpg;base64,${image_url}`}
                  width={300}
                  height={300}
                  alt={`Fotografía de ${product.name}`}
                />
              ) : (
                <Loading />
              )}
            </ImageContainer>
            <InfoContainer>
              <PriceContainer>
                {price !== "" ? (
                  <Price>${formatter.format(price)} </Price>
                ) : (
                  <Consulting />
                )}
              </PriceContainer>

              {stock !== "" && (
                <Stock>
                  <span>{stock}</span> disponibles
                </Stock>
              )}
              <Description>{product.description.toLowerCase()}</Description>
              <Sku>SKU: {product.articulo_id}</Sku>
            </InfoContainer>
          </Product>
          {relatedByName.length > 0 && (
            <RelatedSection>
              <h3>Relacionados</h3>
              <RelatedSecction data={relatedByName} />
            </RelatedSection>
          )}
          {relatedByCategory.length > 0 && (
            <RelatedSection>
              <h3>Puede que te interese</h3>
              <RelatedSecction data={relatedByCategory} />
            </RelatedSection>
          )}
        </>
      ) : (
        <h1>{id}</h1>
      )}
    </MainStyled>
  );
};

export default ProductDetails;

// import React, { useEffect, useState, useRef } from "react";
// import { connect } from "react-redux";
// import { NextSeo, ProductJsonLd } from "next-seo";
// import fetch from "isomorphic-unfetch";
// import { useMyItems } from "../../hooks/useMyItems";
// import { useGetStock } from "../../hooks/useGetStock";
// import { useRouter } from "next/router";

// //Actions
// import {
//   setMyCart,
//   setPricesToCart,
//   setIitemsIliked,
//   setDeleteFavorite,
// } from "../../actions";

// //Components
// import { HeartEmpty } from "../../components/IconsSVG/HeartEmpty";
// import { HeartFull } from "../../components/IconsSVG/HeartFull";
// import { Whatsapp } from "../../components/IconsSVG/Whatsapp";
// import PreviewItem from "../../components/Preview-Item/PreviewItem";

// // Styles
// import styles from "../../styles/components/Main.module.css";

// // Styled-Components
// import {
//   MainInfo,
//   ImageContainer,
//   LikeContainer,
//   Info,
//   NameAndPrice,
//   Name,
//   Price,
//   DescriptionH3,
//   Paragraph,
//   Categories,
//   Category,
//   Sku,
//   Span,
//   ButtonStyled,
//   NotAvailable,
//   RelatedArticles,
//   ScrollLeft,
//   ScrollRight,
//   RelatedTitle,
//   PreviewItemContainer,
//   LinkIcon,
// } from "../../styles/detalles/style";

// export const getServerSideProps = async ({ params }) => {
//   // Solicita los datos del articulo principal
//   const responseDetails = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/detalles-initial/${params.id}`
//   );
//   const { data: product } = await responseDetails.json();

//   return {
//     props: {
//       product: product[0],
//     },
//   };
// };

// const ProductPage = (props) => {
//   const {
//     product,

//     myCart,
//     itemsIliked,

//     setMyCart,
//     setPricesToCart,
//     setIitemsIliked,
//     setDeleteFavorite,
//   } = props;
//   const router = useRouter();
//   // Articulos relacionados por nombre
//   const [related, setRelated] = useState([]);
//   // Articulos relacionados por categoria
//   const [relatedCategory, setRelatedCategory] = useState([]);
//   // Categorias del articulo
//   const [categories, setCategories] = useState([]);

//   const [currentUrl, setCurrentUrl] = useState("");

//   // Hook que verifica si el producto esta entre los favoritos
//   const [yesItIsMineLike] = useMyItems(product.articulo_id, itemsIliked);
//   // Hook que verifica si el producto esta en el carrito
//   const [yesItIsMineCart] = useMyItems(product.articulo_id, myCart);
//   // Hook que solicita el Stock
//   const [stock] = useGetStock(router.query.id);

//   const containerRelated = useRef(null);
//   const containerRelatedCategories = useRef(null);

//   // Envia al Carrito y a la lista de precios
//   const handleSetCart = () => {
//     setMyCart({ ...product, initialQuantity: 1 });
//     setPricesToCart(product.price);
//   };

//   // Envia a favoritos
//   const handleLike = () => {
//     setIitemsIliked({ ...product });
//   };

//   // Elimina de favoritos
//   const handleDeleteFavorite = () => {
//     setDeleteFavorite(product.articulo_id);
//   };

//   // Formatea el precio
//   const formatter = new Intl.NumberFormat("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   useEffect(() => {
//     if (window) {
//       setCurrentUrl(window.location);
//     }
//   }, []);

//   // Scroll Horizontal artículos relacionados
//   const scroll = (related, scrollOffset) => {
//     if (related) {
//       containerRelated.current.scrollLeft += scrollOffset;
//     } else {
//       containerRelatedCategories.current.scrollLeft += scrollOffset;
//     }
//   };

//   // :::::::::::::::::::::::::::::::::::::::::::::
//   // useEffect(async () => {
//   //   // Solicita los datos iniciales
//   //   const responseRelatedByName = await fetch(`/api/detalles-initial/AL`);
//   //   const { data } = await responseRelatedByName.json();

//   //   console.log("====================================");
//   //   console.log(data);
//   //   console.log("====================================");
//   // }, []);

//   // :::::::::::::::::::::::::::::::::::::::::::::

//   useEffect(async () => {
//     // Solicita los nombres de las categorias a las que pertenece
//     const responseRelatedByName = await fetch(
//       `/api/detalles-categories/${product.articulo_id
//         .replace(/ /gi, "space")
//         .replace(/\//gi, "slash")}`
//     );
//     const { data: categories } = await responseRelatedByName.json();
//     setCategories(categories);
//   }, [product]);

//   useEffect(async () => {
//     // Solicita articulos relacionados por nombre
//     const responseRelatedByName = await fetch(
//       `/api/related-by-name/${product.name
//         .split(" ")[0]
//         .replace(/\//gi, "slash")}?first=1&last=6`
//     );
//     const { data: related } = await responseRelatedByName.json();
//     setRelated(related);
//   }, [product]);

//   useEffect(async () => {
//     // Solicita articulos relacionados por categoria
//     if (categories.length > 0) {
//       const responseRelatedByCategory = await fetch(
//         `/api/related-by-category/${categories[0].category
//           .replace(/ /gi, "-")
//           .replace(/Ñ/gi, "enne")}?first=1&last=6`
//       );
//       const { data: relatedCategory } = await responseRelatedByCategory.json();
//       setRelatedCategory(relatedCategory);
//     }
//   }, [categories]);

//   // :::::::::::::::::::::::::::::::::::::::::::::

//   return (
//     <>
//       <NextSeo
//         title={`${product.name} | Materiales Vasquez Hermanos`}
//         description={product.description}
//         canonical="https://www.materialesvasquezhnos.com.mx/"
//         openGraph={{
//           url: `https://www.materialesvasquezhnos.com.mx/detalles/${product.articulo_id}`,
//           title: `${product.name}`,
//           description: `${product.description}`,
//           images: [
//             {
//               url: `https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg`,
//               width: 200,
//               height: 200,
//               alt: `Fotografía de ${product.name}`,
//             },
//           ],
//           site_name: "Materiales Vasquez Hermanos",
//         }}
//         twitter={{
//           handle: "@MaterialesVH",
//           site: "@MaterialesVH",
//           cardType: "summary",
//         }}
//       />

//       <ProductJsonLd
//         productName={`${product.name}`}
//         images={[
//           `https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg`,
//         ]}
//         description={product.description}
//         //brand={product.name}
//       />

//       <main className={styles.MainHome}>
//         <MainInfo>
//           <LikeContainer
//             type="button"
//             onClick={yesItIsMineLike ? handleDeleteFavorite : handleLike}
//           >
//             {yesItIsMineLike ? <HeartFull /> : <HeartEmpty />}
//           </LikeContainer>
//           <ImageContainer>
//             <img
//               src={`data:image/jpg;base64,${product.image_url}`}
//               width={300}
//               height={300}
//               alt={`Fotografía de ${product.name}`}
//             />
//           </ImageContainer>
//           <Info>
//             <NameAndPrice>
//               {product.name && <Name>{product.name}</Name>}
//               {product.price && (
//                 <Price>${formatter.format(product.price)}</Price>
//               )}
//             </NameAndPrice>
//             {product.description && (
//               <>
//                 <DescriptionH3>Descripción</DescriptionH3>
//                 <Paragraph>
//                   {product.description.length > 99
//                     ? product.description
//                         .slice(0, 99)
//                         .concat("...")
//                         .toLowerCase()
//                     : product.description.toLowerCase()}
//                 </Paragraph>
//               </>
//             )}
//             <Paragraph lowStock={stock <= 10 && true}>
//               {stock ? (
//                 <>
//                   {stock > 10 ? (
//                     `${stock} disponibles`
//                   ) : (
//                     <>
//                       {stock > 0
//                         ? `Solo quedan ${stock} disponibles`
//                         : `Solo quedan 12 disponibles`}
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <>{stock === 0 ? "Sin existencias" : "Consultando..."}</>
//               )}
//             </Paragraph>
//             {categories.length > 0 && (
//               <Categories>
//                 Categorías <Category>{categories[0].category}</Category>{" "}
//                 <Category>{categories[0].main_category}</Category>
//               </Categories>
//             )}
//             <Sku>
//               SKU: <Span>{product.articulo_id}</Span>
//             </Sku>
//             {stock > 0 ? (
//               <>
//                 {!yesItIsMineCart ? (
//                   <ButtonStyled type="button" onClick={handleSetCart}>
//                     Añadir al carrito
//                   </ButtonStyled>
//                 ) : (
//                   <ButtonStyled type="button" inMyCArt={yesItIsMineCart}>
//                     Ya está en tu carrito
//                   </ButtonStyled>
//                 )}
//               </>
//             ) : (
//               <NotAvailable>No disponible</NotAvailable>
//             )}
//           </Info>
//         </MainInfo>
//         {currentUrl !== "" && (
//           <LinkIcon
//             href={`https://api.whatsapp.com/send?phone=522288366283&text=Hola,%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20art%C3%ADculo:%20${currentUrl}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Enlace a Twitter"
//             bg="#25d366"
//           >
//             <Whatsapp width="3rem" />
//             Pregunta por este artículo
//           </LinkIcon>
//         )}
//         {related.length > 0 && (
//           <RelatedArticles>
//             <RelatedTitle>Relacionados</RelatedTitle>
//             {related.length > 4 && (
//               <>
//                 <ScrollLeft type="button" onClick={() => scroll(true, -450)} />
//                 <ScrollRight type="button" onClick={() => scroll(true, 450)} />
//               </>
//             )}
//             <PreviewItemContainer ref={containerRelated}>
//               <>
//                 {related.map((article) => (
//                   <PreviewItem
//                     key={article.articulo_id + article.price}
//                     {...article}
//                     isRelated={true}
//                   />
//                 ))}
//               </>
//             </PreviewItemContainer>
//           </RelatedArticles>
//         )}
//         {relatedCategory.length > 0 && (
//           <RelatedArticles>
//             <RelatedTitle>Puede que te interese </RelatedTitle>
//             {relatedCategory.length > 4 && (
//               <>
//                 <ScrollLeft type="button" onClick={() => scroll(false, -450)} />
//                 <ScrollRight type="button" onClick={() => scroll(false, 450)} />
//               </>
//             )}
//             <PreviewItemContainer ref={containerRelatedCategories}>
//               <>
//                 {relatedCategory.map((article) => (
//                   <PreviewItem
//                     key={article.articulo_id}
//                     {...article}
//                     isRelated={true}
//                   />
//                 ))}
//               </>
//             </PreviewItemContainer>
//           </RelatedArticles>
//         )}
//       </main>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     myCart: state.myCart,
//     articles: state.articles,
//     itemsIliked: state.itemsIliked,
//     carIsEmpty: state.carIsEmpty,
//     carIsOpen: state.carIsOpen,
//   };
// };

// const mapDispatchToProps = {
//   setMyCart,
//   setPricesToCart,
//   setIitemsIliked,
//   setDeleteFavorite,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
