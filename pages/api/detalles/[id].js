import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

const rest = new (require("rest-mssql-nodejs"))({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  server: process.env.NEXT_PUBLIC_HOST,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export default async function getDetailsProduct(req, res) {
  // http://localhost:3000/api/detalles/103793832
  // Run cors
  await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }
  const query = req.query.id.replace(/space/g, " ").replace(/slash/gi, "/");

  setTimeout(async () => {
    const result = await rest.executeQuery(`SELECT *
    FROM (
        SELECT ROW_NUMBER () OVER(ORDER BY a.FECHA_ALTA DESC) AS row_id, RTRIM(a.CLAVEART) AS articulo_id, RTRIM(a.DESC_BREVE) AS name, RTRIM(a.DESCRIBEAR) AS description, l.PREC_IVA1 AS price, RTRIM(c.DESCRIBECO) AS category, RTRIM(g.DESGIR) AS main_category, cast('' as xml).value(
        'xs:base64Binary(sql:column("i.IMAGEN"))', 'varchar(max)'
    ) AS image_url
    FROM ARTICULO AS a
    LEFT OUTER JOIN ARTLISTA AS l
        ON a.CLAVEART = l.CLAVEART
    LEFT OUTER JOIN ARTGIRO AS g
        ON a.CLAVEGIR = g.CLAVEGIR
    LEFT OUTER JOIN CAT_CLAS AS c
        ON a.CVE_CLAS = c.CVE_CLAS
    LEFT OUTER JOIN IMAGENES AS i
        ON a.CLAVEART = i.CAMPO1
    LEFT OUTER JOIN ART_ALM AS s
        ON a.CLAVEART = s.CLAVEART
    WHERE a.HABVTAS = '' AND l.NO_LISTAP = '001' AND i.IMAGEN Is NOT NULL AND s.CVEALM IN ('0020','0007','0018','0014','0015','0002','0008','0023','0017','0028','0027')
    GROUP BY a.CLAVEART, a.DESC_BREVE, a.DESCRIBEAR, l.PREC_IVA1, a.CVE_CLAS, c.DESCRIBECO, a.CLAVEGIR, g.DESGIR, i.IMAGEN, a.FECHA_ALTA
  ) AS articles_with_row_nums
  WHERE articulo_id = '${query}';`);

    result &&
      res.status(200).json({
        name: "Details Product",
        total: result.data[0].length,
        data: result.data[0],
      });
  }, 1000);
}
