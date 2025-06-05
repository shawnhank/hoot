import sendRequest from "./sendRequest";

const BASE_URL = '/api/posts';

export async function index() {
  return sendRequest(BASE_URL);
}