const fs = require('fs');

class Container {
  constructor(path) {
    this.path = path   
  }

  async save(obj) {
    if (fileExists(this.path)) {
      try {
        let products = await this.getAll();
        let lastId = (await products[products.length - 1].id) + 1;
        obj.id = lastId;
        products.push(obj);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2)
        );
        return obj.id;
      } catch (error) {
        console.log('Error al guardar el producto');
      }
    } else {
      try {
        let products = [];
        obj.id = 1;
        products.push(obj);
        fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return obj.id;
      } catch (error) {
        console.log('Error al crear el archivo y guardar el producto');
      }
    }
  }

  async getByID(id) {
    try {
      if (fileExists(this.path)) {
        let products = await this.getAll();
        let obj = products.find((item) => item.id == id);

        return obj !== undefined ? obj : null;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    if (fileExists(this.path)) {
      try {
        let products = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(products);
      } catch (error) {
        return [];
      }
    } else {
      console.log('El archivo que estas buscando no existe.');
    }
  }
  async deleteById(id) {
    if (fileExists(this.path)) {
      try {
        let products = await this.getAll();
        let newProducts = products.filter((item) => item.id != id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newProducts, null, 2)
        );
        console.log('listo');
      } catch (error) {
        console.log('Error al borrar el producto');
      }
    }
  }

  async deleteAll() {
    if (fileExists(this.path)) {
      try {
        await fs.promises.unlink(this.path);
      } catch (error) {
        console.log('Error al borrar el contenido del archivo');
      }
    } else {
      console.log('El archivo no existe');
    }
  }
  async getRandom() {
    if(fileExists(this.path)){
      try {
        let products = await this.getAll()
        return await products[Math.floor(Math.random() * products.length)];
      } catch (error) {
        console.log('error al obtener el producto')
      }
    }else{
      console.log('El archivo no existe')
    }
  }
}
//helpers

const fileExists = (path) => {
  try {
    return fs.statSync(path).isFile();
  } catch (err) {
    return false;
  }
};

module.exports = Container;
