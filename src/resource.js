class Resource {
  constructor(endpoint, client) {
    this.endpoint = endpoint;
    this.client = client;
  }

  search(options) {
    return this.client.request(this.endpoint, null, options);
  }
  
  get(id, filled = false) {
    const fill = filled ? `/filled` : ``;
    return this.client.request(`${this.endpoint}/${id}${fill}`)
  }

  save(body) {
    let path = `${this.endpoint}`;

    if(body.hasOwnProperty(`id`)) {
      path += `/${body.id}`;
    }

    return this.client.request(path, body);
  }

  custom(path, body = null, options = null, method = null) {
    return this.client.request(path, body, options, method);
  }
}

module.exports = Resource;