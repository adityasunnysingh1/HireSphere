# ⚡ Vynterview: Real-Time Collaborative Interview Platform

![Vynterview Banner](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge) ![Deployment](https://img.shields.io/badge/Deployed_on-Railway-violet?style=for-the-badge)

> **The seamless bridge between talent and opportunity.** Vynterview is a high-fidelity technical interview platform that combines live video conferencing, synchronized code editing, and multi-language runtime execution in a single, secure environment.

🔗 **Live Demo:** [https://vynterview-production.up.railway.app/](https://vynterview-production.up.railway.app/) *(Replace with your actual link if different)*

---

## 📸 Screenshots

| **Interactive Dashboard** | **Live Coding Arena** |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/600x300?text=Dashboard+Screenshot+Here) | ![Coding Room](https://via.placeholder.com/600x300?text=Coding+Room+Screenshot+Here) |
| *Real-time stats & session management* | *Monaco Editor + Video Call + Output Console* |

---

## 🚀 Key Features

### 🛠️ Engineering & Architecture
* **Event-Driven Architecture:** Utilizes **Inngest** to handle complex background workflows (user sync, session cleanup), ensuring 100% database consistency between Clerk (Auth) and MongoDB.
* **Secure Webhook Synchronization:** Implemented robust webhook handlers to listen for identity events, eliminating data drift.
* **Sandboxed Code Execution:** Integrated **Piston API** to safely compile and run user code (C++, Java, Python, JS) in isolated containers, preventing RCE vulnerabilities.
* **JWT & Axios Interceptors:** Custom Axios interceptors automatically inject rotation-proof authentication tokens into every API request, ensuring seamless security.

### 💻 The Interview Experience
* **VS Code-Like Environment:** Powered by **Monaco Editor**, offering syntax highlighting, linting, and a familiar developer experience.
* **Zero-Latency Collaboration:** Real-time state synchronization allows interviewers and candidates to type and debug simultaneously.
* **Integrated Video/Audio:** Built on **Stream IO (WebRTC)** for high-quality, low-latency communication without needing third-party tools like Zoom.
* **Multi-Language Support:** First-class support for **JavaScript, C++, Java, and Python**.

### 🛡️ Security & Access
* **Identity Management:** Powered by **Clerk** for secure, session-based authentication.
* **Room Locking:** Privacy controls to strictly limit rooms to two participants (Interviewer & Candidate).

---

## 🏗️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS, Monaco Editor, Lucide React |
| **Backend** | Node.js, Express.js, Mongoose (ODM) |
| **Database** | MongoDB Atlas (NoSQL) |
| **Auth & Queues** | Clerk (Auth), Inngest (Event Queues) |
| **Real-Time** | Stream SDK (Video/Audio), WebSockets |
| **DevOps** | Railway (CI/CD Deployment), Git/GitHub |

---

## ⚙️ System Architecture

1.  **Client Layer:** React application with TanStack Query for efficient state management and caching.
2.  **API Gateway:** Express.js REST API protected by Clerk Middleware.
3.  **Execution Engine:** Code is sent to a stateless Piston container; results (stdout/stderr) are streamed back to the client.
4.  **Event Bus:** Inngest functions listen for `user.created` or `session.ended` events to trigger DB updates asynchronously.

---

## 🔧 Getting Started Locally

Follow these steps to run Vynterview on your local machine.

### Prerequisites
* Node.js (v18+)
* MongoDB URI
* Clerk & Stream API Keys

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/adityasunnysingh1/Vynterview.git](https://github.com/adityasunnysingh1/Vynterview.git)
    cd Vynterview
    ```

2.  **Install Dependencies (Root, Frontend, & Backend)**
    ```bash
    npm install
    cd Frontend && npm install
    cd ../Backend && npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `Backend` directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    CLERK_PUBLISHABLE_KEY=your_clerk_key
    CLERK_SECRET_KEY=your_clerk_secret
    STREAM_API_KEY=your_stream_key
    STREAM_API_SECRET=your_stream_secret
    ```

4.  **Run the App**
    ```bash
    # From the root directory
    npm run dev
    ```

---

## 🤝 Contributing

Contributions are welcome! This project follows the "feature-branch" workflow.
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📬 Contact

**Aditya Singh** - Full Stack Developer
* [GitHub](https://github.com/adityasunnysingh1)
* [LinkedIn](https://linkedin.com/in/your-linkedin-profile)
* [Email](mailto:your.email@example.com)

---

<div align="center">
  <sub>Built with ❤️ by Aditya Singh using the MERN Stack.</sub>
</div>
