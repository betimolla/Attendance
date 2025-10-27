export async function postLogin(payload) {
  // placeholder: swap to real fetch/axios call
  return new Promise((resolve) => setTimeout(() => resolve({ data: { id: 1, name: payload.username } }), 300))
}
