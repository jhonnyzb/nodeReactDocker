const express = require('express');
const cors = require('cors');
//const fileUpload = require('express-fileupload');

//const { dbConnection } = require('../database/config');

class Server {

       constructor() {
              this.app = express();
              this.port = process.env.PORT;
              this.server = require('http').createServer(this.app);
              this.io = require('socket.io')(this.server);

              this.paths = {
                     users: '/api/users',
                     //      buscar:     '/api/buscar',
                     //      categorias: '/api/categorias',
                     //      productos:  '/api/productos',
                     //      usuarios:   '/api/usuarios',
                     //      uploads:    '/api/uploads',
              }


              // Conectar a base de datos
              //this.conectarDB();

              // Middlewares
              this.middlewares();

              // Rutas de mi aplicación
              this.routes();

              //Sockets
              this.sockets();
       }

       //     async conectarDB() {
       //         await dbConnection();
       //     }


       middlewares() {

              // CORS
              this.app.use(cors());

              // Lectura y parseo del body
              this.app.use(express.json());

              // Directorio Público
              //this.app.use( express.static('public') );



       }

       routes() {

              this.app.use(this.paths.users, require('../routes/user'));
              //  this.app.use( this.paths.buscar, require('../routes/buscar'));
              //  this.app.use( this.paths.categorias, require('../routes/categorias'));
              //  this.app.use( this.paths.productos, require('../routes/productos'));
              //  this.app.use( this.paths.usuarios, require('../routes/usuarios'));
              //  this.app.use( this.paths.uploads, require('../routes/uploads'));

       }

       sockets() {
              this.io.on('connection', (socket) => {
                     console.log('conectado', socket.id)

                     socket.on('disconnect', () => {
                            console.log('desconectado')
                     })

                     socket.on('UserAdded', (payload) => {
                            console.log(payload)
                            this.io.emit('UserAddedResponse', payload)
                     })

                     // socket.on('appDisconetc', () => {
                     //        socket.disconnect()
                     //        //console.log('desconectado')
                     // })
              });
       }



       listen() {
              this.server.listen(this.port, () => {
                     console.log('Servidor corriendo en puerto', this.port);
              });
       }

}




module.exports = Server;