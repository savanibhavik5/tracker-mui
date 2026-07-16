export default class BaseApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get token() {
    if (typeof window === "undefined") return "";

    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async request(url, options = {}) {
    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request Failed");
    }

    return data;
  }

  getAll() {
    return this.request(this.baseUrl);
  }

  getById(id) {
    return this.request(`${this.baseUrl}/${id}`);
  }

  create(data) {
    return this.request(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  update(id, data) {
    return this.request(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(id) {
    return this.request(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
  }
}