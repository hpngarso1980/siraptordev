import queryString from 'query-string';

function generateGetAllInterface(url) {
  return function getAll(options) {
    const { query = {} } = options || {};
    const qs = queryString.stringify(query);

    return this.get(`${url}?${qs}`);
  };
}

function generateGetByIdInterface(url) {
  return function getById(id) {
    return this.get(`${url}/${id}`);
  };
}

function generateCreateInterface(url) {
  return function create(data) {
    return this.post(url, data);
  };
}

function generateUpdateInterface(url) {
  return function update(id, data) {
    return this.patch(`${url}/${id}`, data);
  };
}

function generateDeleteInterface(url) {
  return function deleteData(id) {
    return this.delete(`${url}/${id}`);
  };
}

const generatorTypes = {
  getAll: generateGetAllInterface,
  getById: generateGetByIdInterface,
  create: generateCreateInterface,
  update: generateUpdateInterface,
  delete: generateDeleteInterface,
};

export default function generateInterface(interfaceType, url) {
  return generatorTypes[interfaceType](url);
}
