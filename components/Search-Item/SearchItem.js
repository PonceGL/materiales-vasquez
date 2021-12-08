import Image from "next/image";
import Link from "next/link";
// Hooks
import { useGetImage } from "../../hooks/useGetImage";
import { useGetPrice } from "../../hooks/useGetPrice";

// Components
import { Loading } from "../Loaders/Loading";
import { Consulting } from "../Loaders/Consulting";

// Styled Componenst
import {
  Item,
  ImageContainer,
  IconContainer,
  ItemInfo,
  ItemText,
  ItemPrice,
  ItemCategory,
} from "./style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const SearchItem = ({ articulo_id, main_category, name }) => {
  const [image_url] = useGetImage(articulo_id);
  const [price] = useGetPrice(articulo_id);

  return (
    <Link href={`/detalles/${articulo_id}`} passHref>
      <Item aria-label={`Ver detalles de ${name}`}>
        <ImageContainer>
          {image_url ? (
            <Image
              loader={loader}
              src={`data:image/jpg;base64,${image_url}`}
              alt={`Imagen de producto no disponible`}
              width="200"
              height="200"
              blurDataURL
            />
          ) : (
            <IconContainer>
              <Loading />
            </IconContainer>
          )}
        </ImageContainer>
        <ItemInfo>
          {name && <ItemText>{name.toLocaleLowerCase()}</ItemText>}
          {price !== "" ? (
            <ItemPrice>${formatter.format(price)}</ItemPrice>
          ) : (
            <Consulting />
          )}
          {main_category && (
            <ItemCategory>{main_category.toLocaleLowerCase()}</ItemCategory>
          )}
        </ItemInfo>
      </Item>
    </Link>
  );
};

export default SearchItem;
