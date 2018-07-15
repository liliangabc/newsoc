module.exports = {
  "apps": [
    {
      "name": "nuxt-biaobiao",
      "max_memory_restart": "512M",
      "script": "./build/main.js",
      "env": {
        "PORT": "5000",
        "NODE_ENV": "production",
        "REMOTEURL": "https://iapi.tmzhijia.com:8080"
        // "REMOTEURL": "http://localhost:8080"
      }
    }
  ]
};