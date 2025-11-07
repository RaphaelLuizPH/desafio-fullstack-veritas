import axios, { Axios } from "axios";

const ax = axios.create();

ax.defaults.baseURL = "http://localhost:8080/";

export default ax;
