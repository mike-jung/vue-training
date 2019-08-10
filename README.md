# vue-training

This is an example project for vue.js tutorial

- This example uses vue.js and bootstrap for frontend
- Node.js and MySQL database are used for backend (node-web-starter template project is used)


## Application Structure

  * `ex01/`
    * ... - Folder containing basic examples for Vue.js usage.
  * `ex02_01/`
    * ... - Folder for Vue.js frontend project made using Vue CLI command.
  * `server02_01/`
    * ... - Folder for Node.js web server made using node-web-starter project.
    

## Getting Started

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
$ git clone https://github.com/mike-jung/vue-training.git myproject

# Change to the server directory
$ cd myproject/server02_01

# Install dependencies
$ npm install
 
# Start the server
$ npm start
 
```

MySQL database needs to be installed and posts table in test database to be created.
The posts table has three columns: id (int primary key autoincrement), title (varchar 50), body (text)
Test url for example Vue.js pages are as follows:

  * http://localhost:7001/post/

