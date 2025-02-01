## FAQ Management System

### Setup
1. Clone the repo
2. Install dependencies
3. Start the server

### Structure
faq-system/ ├── models/ # FAQ model │ └── Faq.js # FAQ Schema definition ├── routes/ # API routes │ └── faqRoutes.js # API route for FAQ operations ├── config/ # DB and Redis configuration │ └── database.js # MongoDB connection config │ └── redis.js # Redis connection config ├── .env # Environment variables ├── app.js # Main app file, includes middleware, routing setup └── README.md # Project documentation

### API Endpoints

1. **Add FAQ (Admin)**  
   **POST** `/api/admin/add-faq`  
   **Request Body:**  
   ```json
   {
     "question": "What is Node.js?",
     "answer": "Node.js is a JavaScript runtime."
   }
Response:{
  "message": "FAQ added successfully"
}
2. **Get FAQs** 
GET /api/faq
Query Parameter: lang (default is en)
Example: GET /api/faq?lang=hi
Response:[
  {
    "question": "Node.js क्या है?",
    "answer": "Node.js एक JavaScript रनटाइम है।"
  }
]
### Features
Redis caching for translations