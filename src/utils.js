import axios from "axios";
import FileDownload from "js-file-download";

// const COVID_PATH_API = "https://private-ea54fd-covid4.apiary-mock.com";
// const COVID_PATH_API = "http://157.86.153.23/inova-covd19-web";
const COVID_PATH_API = "http://localhost:8081";

const instance = axios.create({
  baseURL: `${COVID_PATH_API}`,
  timeout: 20000,
});

export async function get_samples({search}) {
  const response = await instance.get(`/amostra?busca=${search}`);
  return response.data;
}

export function get_files() {
  return get_generic("arquivo");
}

export function get_diseases() {
  return get_generic("doenca");
}

export function get_tissues() {
  return get_generic("tecido");
}

export function get_comorbidities() {
  return get_generic("comorbidade");
}

export function get_severities() {
  return get_generic("gravidade");
}

export async function get_generic(route) {
  const response = await instance.get(`/${route}`);
  return response.data;
}

export async function download_sample(id) {
  const response = await instance.get(
    `/amostra/${id}/download`, { responseType: 'blob' }
  );
  FileDownload(response.data, `amostra-${id}.rar`);
  return response;
}

export async function transfer_files() {
  const response = await instance.post("/amostras");
  return response;
}

export async function delete_sample(sampleId) {
  const response = await instance.delete(`/amostra/${sampleId}`);
  return response;
}

export async function register_sample(sample) {
  const response = await instance.post("/amostra", sample);
  return response;
}
