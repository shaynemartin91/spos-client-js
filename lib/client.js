require('isomorphic-fetch');
const Resource = require(`./resource`);
const entities = require(`./entities`);
const utils = require(`./utils`);

const defaultHeaders = {'Content-Type': 'application/json'};
const headers = (token) => Object.assign({}, defaultHeaders, {'X-AC-Auth-Token': token});

function addResources(client) {
  entities.forEach(({name, endpoint}) => {
    client[name] = new Resource(endpoint, client);
  });
};

class Client {
  constructor(domain, token) {
    this.domain = domain;
    this.token = token;

    addResources(this);
  }

  async request(path, body = null, options = null, method = null) {
    const query = utils.parseQuery(options);
    const url = `https://${this.domain}/api/v1/${path}${query}`;

    if(!method) {
      if(body) {
        if(body.hasOwnProperty(`id`)) {
          method = `PUT`;
        } else {
          method = `POST`;
        }
      } else {
        method = `GET`;
      }
    }

    const request = {
      method,
      headers: headers(this.token),
    }

    if(body) {
      request.body = JSON.stringify(body);
    }
    
    let response = await fetch(url, request);

    if(response.status === 429) {
      const delay = utils.timeUntil(response.headers.get(`Retry-After`));
      await utils.wait(delay + 100);
      return await this.request(path, body = null, options = null, method = null);
    } else {
      return await response.json();
    }
  }
}

module.exports = Client;