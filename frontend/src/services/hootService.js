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

export async function update(hootId, hootData) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'PUT', hootData);
}

export async function deleteHoot(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'DELETE');
}

// Comment-related functions
export async function createComment(hootId, commentData) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, 'POST', commentData);
}

export async function updateComment(hootId, commentId, commentData) {
  return sendRequest(`${BASE_URL}/${hootId}/comments/${commentId}`, 'PUT', commentData);
}

export async function deleteComment(hootId, commentId) {
  return sendRequest(`${BASE_URL}/${hootId}/comments/${commentId}`, 'DELETE');
}