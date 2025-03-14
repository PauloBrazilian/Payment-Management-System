# Payment Management System

## Betalent API - Back-end Practical Test

### 📌 **Overview**
This project is a **RESTful API** for a **multi-gateway payment management system**, developed with **AdonisJS** and **MySQL**. The API processes transactions using different **payment gateways**, following a predefined priority order. If one gateway fails, the API will try the next one until the transaction is successfully completed.

Development is being done at **Level 1**.

---

### 🛠 **Technologies Used**
- **AdonisJS 5** – Node.js Framework
- **MySQL** – Database
- **Lucid ORM** – Database Management
- **JavaScript** – Programming Language
- **TypeScript** – Superset of JavaScript
- **Node.js** – JavaScript Runtime
- **Microservices** – Architecture Style

---

### **📥 1️⃣ Clone the Repository**

```bash
git clone https://github.com/PauloBrazilian/Payment-Management-System.git
```

Then, install the dependencies with:

```bash
npm install
```

Navigate to the project folder:

```bash
cd <folder-name>
```

Start the development server:

```bash
npm run dev
```

---

### **📦 2️⃣ Clone the Postman**

You can import the Postman collection using the following links:

- [**Postman Collection**](./Payment-Management-System.postman_collection.json)
- [**Postman Environment**](./Payment-Management-System.postman_environment.json)

These files will help you test and interact with the APIs directly via Postman.

---

### **📈 Tests and Environment**

- Ensure that you have correctly set up the development environment with the necessary variables.
- Use the Postman files to test the endpoints and simulate transactions.
