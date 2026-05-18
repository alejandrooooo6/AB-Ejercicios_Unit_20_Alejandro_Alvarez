export interface GasStation {
  "Rótulo": string;
  "IDProvincia": string;
  "Provincia": string;
  "Municipio": string;
  "Dirección": string;
  "Precio Gasoleo A": string;
  "Precio Gasolina 95 E5": string;
}

export interface CleanStation {
  estacion: string;
  provincia: string;
  municipio: string;
  direccion: string;
  diesel_A: string;
  gasolina_95: string;
}