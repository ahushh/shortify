Shortify
========

### Run

`docker-compose up --build`

App will run on `localhost:3000`. Port can be changed by setting `PORT` env variable.

### Generate shorten link

___________

**Endpoint:**

`POST` `/`

**Request Headers:**

`Accept: application/json`

**Request Payload:**

```
{
   "url": "http://ya.ru"
}
```

"url" must a valid URL string.

**Response Body:**

```
{
    "shortLink": "http://localhost:3000/53J"
}
```

`http://localhost:3000` could be set manually by changing `BASE_URL` environment variable.

### Get full URL

___________

Visit `http://localhost:3000/53J` and you will be redirected to "http://ya.ru".

If `Accept: application/json` headers are set, you will get JSON:

```
{
    "url": "http://ya.ru"
}
```