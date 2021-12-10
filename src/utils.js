import axios from "axios";
import FileDownload from "js-file-download";

const { REACT_APP_API_URL } = process.env
const COVID_PATH_API = REACT_APP_API_URL;

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

export async function get_sample(sampleId) {
  const response = await instance.get(`/amostra/${sampleId}`);
  return response.data;
}

export async function delete_sample(sampleId) {
  const response = await instance.delete(`/amostra/${sampleId}`);
  return response;
}

export async function register_sample(sample) {
  const response = await instance.post("/amostra", sample);
  return response;
}

export async function login(user, password) {
  const response = await instance.post("/login", {user, password});
  const { token } = response.data;
  if (token) {
    localStorage.setItem("token", token);
    setTokenOnHeader();
  }
  return response.data;
}

function setTokenOnHeader() {
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.token =  token;
    return config;
  });
}

export async function userIsLogged() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      setTokenOnHeader();
      await instance.get('/');
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
  };
  return false;
}

export async function update_sample(sample, id) {
  const response = await instance.put(`/amostra/${id}`, sample);
  return response;
}
