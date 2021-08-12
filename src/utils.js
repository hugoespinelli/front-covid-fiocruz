import axios from "axios";

const COVID_PATH_API = "https://private-ea54fd-covid4.apiary-mock.com";

const instance = axios.create({
  baseURL: `${COVID_PATH_API}`,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export async function get_samples(search) {
  const response = await instance.get("/amostras");
  return response.data;
}

export async function get_files(search) {
  const response = await instance.get("/arquivos");
  return response.data;
}

export async function download_sample() {
  const response = await instance.get("/download");
  return response;
}

export async function transfer_files() {
  const response = await instance.post("/amostras");
  return response;
}

export async function register_sample(sample) {
  const response = await instance.post("/amostras", sample);
  return response;
}
