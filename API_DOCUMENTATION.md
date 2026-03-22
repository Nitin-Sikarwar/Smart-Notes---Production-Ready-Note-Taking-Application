# Smart Notes API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format
All API responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "errors": array (only for validation errors)
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Get User Profile
**GET** `/auth/profile` 🔒

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

## Notes Endpoints

### Get All Notes
**GET** `/notes` 🔒

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string) - Search term for title, content, and tags
- `tags` (string) - Comma-separated tag names
- `sortBy` (string, default: "updatedAt") - Sort field
- `sortOrder` (string, default: "desc") - Sort order (asc/desc)
- `includeDeleted` (boolean, default: false) - Include deleted notes

**Example Request:**
```
GET /notes?page=1&limit=12&search=meeting&tags=work,important&sortBy=updatedAt&sortOrder=desc
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notes": [
      {
        "_id": "note_id",
        "title": "Meeting Notes",
        "content": "<p>Meeting content here...</p>",
        "tags": ["work", "meeting"],
        "isPinned": false,
        "isDeleted": false,
        "userId": "user_id",
        "createdAt": "2023-12-01T10:00:00.000Z",
        "updatedAt": "2023-12-01T10:30:00.000Z"
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 5,
      "total": 50
    }
  }
}
```

### Create Note
**POST** `/notes` 🔒

**Request Body:**
```json
{
  "title": "My New Note",
  "content": "<p>Note content with <strong>rich text</strong></p>",
  "tags": ["personal", "ideas"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "note_id",
    "title": "My New Note",
    "content": "<p>Note content with <strong>rich text</strong></p>",
    "tags": ["personal", "ideas"],
    "isPinned": false,
    "isDeleted": false,
    "userId": "user_id",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
}
```

### Get Single Note
**GET** `/notes/:id` 🔒

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "note_id",
    "title": "My Note",
    "content": "<p>Note content</p>",
    "tags": ["tag1", "tag2"],
    "isPinned": false,
    "isDeleted": false,
    "userId": "user_id",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:30:00.000Z"
  }
}
```

### Update Note
**PUT** `/notes/:id` 🔒

**Request Body:**
```json
{
  "title": "Updated Note Title",
  "content": "<p>Updated content</p>",
  "tags": ["updated", "tags"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "note_id",
    "title": "Updated Note Title",
    "content": "<p>Updated content</p>",
    "tags": ["updated", "tags"],
    "isPinned": false,
    "isDeleted": false,
    "userId": "user_id",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T11:00:00.000Z"
  }
}
```

### Delete Note
**DELETE** `/notes/:id` 🔒

**Query Parameters:**
- `permanent` (boolean, default: false) - Permanently delete or soft delete

**Soft Delete (default):**
```
DELETE /notes/note_id
```

**Permanent Delete:**
```
DELETE /notes/note_id?permanent=true
```

**Response (Soft Delete):**
```json
{
  "success": true,
  "message": "Note moved to trash",
  "data": {
    "_id": "note_id",
    "title": "Note Title",
    "content": "<p>Content</p>",
    "tags": ["tag1"],
    "isPinned": false,
    "isDeleted": true,
    "userId": "user_id",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T12:00:00.000Z"
  }
}
```

**Response (Permanent Delete):**
```json
{
  "success": true,
  "message": "Note permanently deleted",
  "data": {
    "message": "Note permanently deleted"
  }
}
```

### Restore Note
**PUT** `/notes/:id/restore` 🔒

**Response:**
```json
{
  "success": true,
  "message": "Note restored successfully",
  "data": {
    "_id": "note_id",
    "title": "Restored Note",
    "content": "<p>Content</p>",
    "tags": ["tag1"],
    "isPinned": false,
    "isDeleted": false,
    "userId": "user_id",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T12:30:00.000Z"
  }
}
```

### Toggle Pin Status
**PUT** `/notes/:id/pin` 🔒

**Response:**
```json
{
  "success": true,
  "message": "Note pinned",
  "data": {
    "_id": "note_id",
    "title": "Pinned Note",
    "content": "<p>Content</p>",
    "tags": ["important"],
    "isPinned": true,
    "isDeleted": false,
    "userId": "user_id",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T13:00:00.000Z"
  }
}
```

### Get All Tags
**GET** `/notes/tags` 🔒

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "work",
      "count": 15
    },
    {
      "name": "personal",
      "count": 8
    },
    {
      "name": "ideas",
      "count": 5
    }
  ]
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Title must be between 1 and 200 characters",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Note not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server Error"
}
```

## Rate Limiting
- **Limit:** 100 requests per 15 minutes per IP
- **Response when exceeded:**
```json
{
  "success": false,
  "message": "Too many requests. Please slow down."
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Postman Collection
You can import the following Postman collection to test the API:

```json
{
  "info": {
    "name": "Smart Notes API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{jwt_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "jwt_token",
      "value": ""
    }
  ]
}
```

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Note (with token)
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Note",
    "content": "<p>This is a test note</p>",
    "tags": ["test", "api"]
  }'
```

### Get Notes (with search and pagination)
```bash
curl -X GET "http://localhost:5000/api/notes?page=1&limit=10&search=test" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```