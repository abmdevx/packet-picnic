# Secure File Sharing API

A secure and simple REST API for uploading and sharing files through unique download links.

## Features

* Upload files through a REST API
* Store uploaded files locally
* Generate a unique identifier for each file
* Generate a unique download URL
* Download the original file without quality loss
* Optional download count tracking

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Multer

## API

### Upload File

`POST /api/files/upload`

Accepts a file using `multipart/form-data` and returns a unique download URL.

### Download File

`GET /api/files/:uniqueId`

Downloads the file associated with the provided unique identifier.

## Current Scope

The current phase focuses on the core functionality:

**Upload → Store → Generate Link → Download**

Authentication, cloud storage, and additional features will be introduced in future phases.