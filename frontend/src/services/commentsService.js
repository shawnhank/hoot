// Import the sendRequest utility function that handles API calls
import sendRequest from "./sendRequest";


// Creates a function that returns the base URL for comment endpoints
// This is a function (not a constant) because the URL depends on the hootId
// which will be different for each hoot
const BASE_URL = (hootId) => `/api/hoots/${hootId}/comments`;

// Creates a new comment on a specific hoot
// @param {string} hootId - The ID of the hoot to comment on
// @param {object} commentData - The comment data (typically contains text)
/// @returns {Promise} - The created comment object
export async function createComment(hootId, commentData) {
  // Send a POST request to create a new comment
  // The URL will be something like /api/hoots/123456/comments
  return sendRequest(BASE_URL(hootId), 'POST', commentData);
};

// Updates a specific comment on a hoot
// @param {string} hootId - The ID of the hoot containing the comment
// @param {string} commentId - The ID of the comment to update
// @param {object} commentData - The updated comment data (typically contains text)
// @returns {Promise} - The updated comment object
export async function updateComment(hootId, commentId, commentData) {
  // Send a PUT request to update a specific comment
  // The URL will be something like /api/hoots/123456/comments/789012
  return sendRequest(`${BASE_URL(hootId)}/${commentId}`, 'PUT', commentData);
};


// Deletes a specific comment from a hoot
// @param {string} hootId - The ID of the hoot containing the comment
// @param {string} commentId - The ID of the comment to delete
// @returns {Promise} - The response from the server
export async function deleteComment(hootId, commentId) {
  // Send a DELETE request to remove a specific comment
  // The URL will be something like /api/hoots/123456/comments/789012
  return sendRequest(`${BASE_URL(hootId)}/${commentId}`, 'DELETE');
};