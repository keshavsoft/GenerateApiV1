# 🚀 AI Schema Generator (VS Code Extension)

Instantly generate a structured backend project and APIs directly inside VS Code.

---

## 📌 What is this?

**AI Schema Generator** is a VS Code extension that helps you:

* Generate a complete backend project structure
* Auto-create folders, config, and base files
* Build APIs from schema instantly
* Run and test your project in seconds

---

## ⚡ Features

### 1. One-click Schema Creation

* Creates project structure automatically:

  ```
  Config/
  Data/
  ForFrontEnd/
  V1/
  ```

* Generates essential files:

  * `.env`
  * `.env.local`
  * `app.js`
  * `package.json`

---

### 2. API Builder

* Converts generated schema into working APIs
* Ready-to-run Node.js backend

---

### 3. Integrated Workflow

Everything happens inside VS Code:

* No manual setup
* No boilerplate writing
* No folder creation

---

## 🧠 How It Works

1. Open Command Palette

   ```
   Ctrl + Shift + P
   ```

2. Run:

   ```
   ext openUI
   ```

3. Click:

   * ✅ **Create Schema**
   * ✅ **Build API**

---

## ▶️ Running the Project

After schema generation:

```bash
npm install
npm run start
```

Output:

```
Example app listening on port 3000
http://localhost:3000
```

---

## 📁 Generated Structure

```
project-root/
│
├── Config/
├── Data/
├── ForFrontEnd/
├── V1/
│
├── .env
├── .env.local
├── app.js
├── package.json
```

---

## 🎯 Design Philosophy

This tool is built on:

* **Orchestration over complexity**
* **Zero manual setup**
* **Fast backend bootstrapping**

---

## ⚠️ Current Scope

To keep things simple and fast:

* Only essential schema generation is supported
* Limited UI interactions
* Focus is on speed, not customization

---

## 🚧 Known Limitations

* Column-level customization is minimal
* Some endpoints (GET/POST variants) may be limited
* No schema editor UI yet

---

## 🔮 Future Improvements (Optional)

* Schema editor inside UI
* API preview panel
* Progress indicators
* Selective rebuild

---

## 👨‍💻 Developer Notes

* Built as a VS Code Extension
* Uses Webview for UI
* Node.js backend generation
* File system driven architecture

---

## ✅ Why This Exists

To eliminate:

* Repetitive project setup
* Boilerplate coding
* Manual folder structuring

And replace it with:

> ⚡ One-click backend generation

---

## 🏁 Summary

If you want to:

* Start backend projects instantly
* Avoid setup overhead
* Focus on actual logic

This tool gives you a **ready-to-run foundation in seconds.**

---

**Built with focus on simplicity and speed.**
