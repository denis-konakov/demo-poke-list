import axios from 'axios';
import { BASE_URL } from './config';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export default customAxios;
