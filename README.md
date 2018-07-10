# dev-api-server

Configurable api server (only) for client development

**DO NOT USE THIS FOR ANY KINDS OF PRODUCTION LEVEL DEPLOYMENTS**

## How to Install

1. To install globally, run following command at any directory.
    ``` shell
    npm i -g dev-api-server
    ```
2. To install locally, run following command in your project.
    ``` shell
    npm i -D dev-api-server
    ```

## How to Use
Let's suppose that you have `dev-api.json` in your current directory with following contents (You can find the file in `examples/dev-api.json`)

``` json
{
  "apis": [
    {
      "apiPath": "/",
      "body": "Hello dev-api-server!"
    },
    {
      "apiPath": "/file",
      "filePath": "dev-api.json"
    }
  ]
}
```

To execute dev-api-server,

1. When you installed it globally,
    ``` shell
    dev-api-server
    ```
2. When you installed it locally,
    ``` shell
    npx dev-api-server
    ```

Now let's open the browser (or any other REST client tools) and access `localhost:3210/` and `localhost:3210/file`!

You can also use custom config file. This time, let's suppose that you have `my-api.json` in your current directory with following contents (Again, you can find the file in `examples/my-api.json`)

``` json
{
  "apis": [
    {
      "apiPath": "/dev",
      "body": "hello"
    },
    {
      "apiPath": "/(.*)",
      "code": 503
    }
  ]
}
```

You can run dev-api-server with

1. When you installed it globally,
    ``` shell
    dev-api-server ./my-api.json
    ```
2. When you installed it locally,
    ``` shell
    npx dev-api-server ./my-api.json
    ```

Now when you access `localhost:3210/dev`, and any other paths will give you HTTP 503 error.

## DIY Configurations

To make your own configuration, you can use following keys.

### apis
The value of `"apis"` should be an array of *api*s.

#### api
*api* is one of following type with common keys like `"apiPath"`, `"headers"`.
1. Body API
1. Serving API
1. Failing API

#### api.apiPath [REQUIRED]
`"apiPath"` is a path for the api. You can use any string that works with [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

#### api.headers
The value of `"headers"` is an optional object whose keys are header names and values are header values.
For example, with following json,
``` json
{
  "apis": [
    {
      "apiPath": "/",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": "{ \"abc\": \"def\" }"
    }
  ]
}
```
when you access `/` path it will give you json-parsed `"{ \"abc\": \"def\" }"`.

#### Body API
Body API is an api with `"body"` (REQUIRED) whose value is string or object.
However, if you want to get the object as JSON format, you should add `"Content-Type"` header just like what we did in [headers section](#headers).

#### Serving API
Serving API is an api with `"filePath"` (REQUIRED) whose value is string. This API sends a file in the `"filePath"`. When you use relative path for `"filePath"`, it will resolved from the directory where you execute dev-api-server.

#### Failing API
Failing API is an api with `"code"` (REQUIRED) whose value is number. This API always sends that code as a HTTP status code.

### port
You can change your port by setting `"port"`.
For example,
``` json
{
  "port": 5040
}
```
will give you a server with 5040 port.

### host
You can change your host by setting `"host"`.

## Options
You can also have few options.

### --help
Surprise surprise... With this option, app displays help message.

### --watch
When you run dev-api-server with this option, dev-api-server will be restarted whenever your config json file is updated.

### --version
Oh, one more creative option! App will give you a version of dev-api-server!

## Author
- Junyoung Clare Jang [@Ailrun](https://github.com/Ailrun)
