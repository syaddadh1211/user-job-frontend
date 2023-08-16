import axios from "axios";

// Di sini kita membuat instance dari axios
const gramedia = axios.create({
  baseURL: "https://laravel-books-db.herokuapp.com/api",
  headers: {
    // 83|MjHukGCaYeAPD9Pb68E85RzGRiW2HEii9UM0mDJD
    // Authorization: "Bearer 83|MjHukGCaYeAPD9Pb68E85RzGRiW2HEii9UM0mDJD",
    Authorization: "Bearer 83|MjHukGCaYeAPD9Pb68E85RzGRiW2HEii9UM0mDJD",
    Accept: "application/json",
  },
  params: {
    // TODO: Jangan lupa masukkan API_KEY yang benarnya di sini yah !
    Language: "en",
    Page: "1",
  },
});

const gramediaLokal = axios.create({
  baseURL: "https://laravel-books-db.herokuapp.com/api",
  headers: {
    Authorization: "Bearer 83|MjHukGCaYeAPD9Pb68E85RzGRiW2HEii9UM0mDJD",
    Accept: "application/json",
  },
  params: {
    // TODO: Jangan lupa masukkan API_KEY yang benarnya di sini yah !
    Language: "id",
    Page: "1",
  },
});

const userSectorAll = axios.create({
  baseURL: "http://localhost:4000/user",
  },
);

const gramediaKeyword = axios.create({
  baseURL: "https://laravel-books-db.herokuapp.com/api",
  headers: {
    Authorization: "Bearer 83|MjHukGCaYeAPD9Pb68E85RzGRiW2HEii9UM0mDJD",
    Accept: "application/json",
  },
  params: {
    // TODO: Jangan lupa masukkan API_KEY yang benarnya di sini yah !
    keyword: "",
  },
});

// Jangan lupa diexport karena akan digunakan di tempat lainnya
export { gramedia, gramediaLokal, gramediaKeyword, userSectorAll };
