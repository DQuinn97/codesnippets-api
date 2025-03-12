## routes

`/` - front-end web page

`GET /api/snippets` - get all snippets, can use query filters  
`GET /api/snippets/:id` - get snippet with id  
`POST /api/snippets` - add new snippet, needs body  
`PUT /api/snippets/:id` - update snippet with id, needs body  
`DELETE /api/snippets/:id` - delete snippet with id

### body

```JSON
{
"name": "string",
"code": "code string",
"tags": ["tag","tag","tag"],
"language": "string",
"expiresIn": 3600 //optional, in seconds
}
```

### snippet filters

`GET /api/snippets`

- `?language=:language` - filters by language
- `?tags=:tag,:tag,:tag` - filters by comma separated tags
- `?limit=:limit` - page size
- `?page=:page` - page
