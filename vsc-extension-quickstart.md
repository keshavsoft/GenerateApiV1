# 🛠️ AI Schema Generator – Developer Guide

This document explains how to use and understand the extension from a developer perspective.

---

## 📌 Purpose

The extension automates:

* Project structure creation
* Backend scaffolding
* API generation

It removes manual setup and provides a ready-to-run backend.

---

## ⚙️ How to Use

### 1. Open the Extension UI

Open Command Palette:

Ctrl + Shift + P

Run:

ext openUI

---

### 2. Create Schema

Click:

Create Schema

This will generate:

* Config/
* Data/
* ForFrontEnd/
* V1/

And files:

* .env
* .env.local
* app.js
* package.json

---

### 3. Build API

Click:

Build API

This generates API logic based on the created schema.

---

## ▶️ Running the Generated Project

Open terminal in project root:

npm install
npm run start

Server will run at:

http://localhost:3000

---

## 📁 Folder Responsibilities

### Config/

* Configuration-related files

### Data/

* Data structure and schema definitions

### ForFrontEnd/

* Files intended for frontend integration

### V1/

* Versioned API implementation

---

## 🧠 Internal Flow (Architecture)

```id="flow1"
UI (Webview)
  → Command (ext openUI)
  → Handlers
  → Services
  → File System
  → Project Structure Created
```

---

## 🔄 Key Operations

### Schema Creation

* Creates folders
* Writes base files
* Initializes project

### API Build

* Reads schema/data
* Generates API files
* Prepares runnable backend

---

## ⚠️ Notes for Developers

* The extension assumes a clean workspace
* Existing folders may affect generation
* Environment files are auto-created

---

## 🚧 Limitations

* No schema editing UI
* Limited customization
* Fixed folder structure

---

## 💡 Suggested Workflow

1. Run Create Schema
2. Run Build API
3. Install dependencies
4. Start server
5. Extend logic as needed

---

## 🏁 Summary

This extension is a **backend bootstrap tool**.

Use it to:

* Save setup time
* Standardize structure
* Focus on business logic
