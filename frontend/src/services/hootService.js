import sendRequest from './sendRequest';

const BASE_URL = '/api/hoots';
 
export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(hootData) {
  return sendRequest(BASE_URL, 'POST', hootData);
}

export async function show(hootId) {
  // The original code is passing the hootId as the second parameter (method)
  // instead of appending it to the URL
  return sendRequest(`${BASE_URL}/${hootId}`, 'GET');
}

export async function update(hootId) {
  return sendRequest(BASE_URL, 'PUT', hootId);
}

export async function deletedHoot(hootId) {
  return sendRequest(BASE_URL, 'DELETE', hootId);
}
