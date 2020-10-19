define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Request User Login",
    "name": "Login_User",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email/username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Token.",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\t\"success\": true,\n\t\t\t\"data\": {\n\t\t\t     \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVuZGVmaW5lZF9Nb24gT2N0IDE5IDIwMjAgMTE6NDY6MjAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpIg.m-ZzA1xcZfONykr5r-Yfo5cgdnF65vYHz3FC3jZj4rY\"\n\t\t\t},\n\t\t\t\"count\": 1,\n\t\t\t\"totalCount\": 1,\n\t\t\t\"error\": [],\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n\t\t\"success\":false,\n\t\t\"data\":{},\n\t\t\"count\":0,\n\t\t\"totalCount\":0,\n\t\t\"error\":[{\"code\":10001,\"message\":\"Invalid User.\"}]}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth-router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/logout",
    "title": "Request User Logout",
    "name": "Logout_User",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "toke",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\t\"success\": true,\n\t\t\t\"data\": {},\n\t\t\t\"count\": 1,\n\t\t\t\"totalCount\": 1,\n\t\t\t\"error\": [],\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n\t\t\"success\":false,\n\t\t\"data\":{},\n\t\t\"count\":0,\n\t\t\"totalCount\":0,\n\t\t\"error\":[{\"code\":401,\"message\":\"You are not authorized to use this application.\"}]}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth-router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/user/",
    "title": "Request User Creation",
    "name": "Create_User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\t\"success\": true,\n\t\t\t\"data\": {\n\t\t\t\"name\": \"manisha\",\n\t\t\t\"email\": \"manisha@gmail.com\",\n\t\t\t\"password\": \"$2b$10$ml9D0DEpN4A05dYXO6ojxewIojzmkveNc8DrHmGPKaoji7pCDi7KG\",\n\t\t\t\"username\": \"manisha\"\n\t\t\t},\n\t\t\t\"count\": 1,\n\t\t\t\"totalCount\": 1,\n\t\t\t\"error\": [],\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n\t\t\"success\":false,\n\t\t\"data\":{},\n\t\t\"count\":0,\n\t\t\"totalCount\":0,\n\t\t\"error\":[{\"code\":11000,\"message\":\"Duplicate Entry.\"}]}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user-router.js",
    "groupTitle": "User"
  }
] });
