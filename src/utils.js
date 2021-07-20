import axios from "axios";

const COVID_PATH_API = "https://private-ea54fd-covid4.apiary-mock.com";

const instance = axios.create({
  baseURL: `${COVID_PATH_API}`,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export async function get_samples(search) {
  try {
    const response = await instance.get("/amostras");
    // const response = [
    //   {
    //     numero: 1111,
    //     estaInfectado: 1,
    //     doenca: "covid",
    //     gravidade: "leve",
    //     tecido: "pulmão",
    //   },
    // ];
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function download_sample() {
  try {
    const response = await instance.get("/download");
    return response;
  } catch (error) {
    console.error(error);
  }
}
