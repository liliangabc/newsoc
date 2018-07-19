module.exports = {
  "apps": [
    {
      "name": "nuxt-circcus",
      "max_memory_restart": "512M",
      "script": "./build/main.js",
      "env": {
        "PORT": "3000",
        "NODE_ENV": "production",
        // "HOST": "www.circcus.com",
        // "HOST": "192.168.0.200",
        "HOST": "0.0.0.0",
        "APIURL": "http://i.circcus.com/api/student"
      }
    }
  ]
};