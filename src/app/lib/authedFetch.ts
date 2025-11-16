export async function authedFetch(url: string, options: RequestInit = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };

    return fetch(url, { ...options, headers });
}
