import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

// Import Routes
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// ✅ Fix directory access for Render
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load OpenAPI YAML (absolute path)
const swaggerPath = path.join(__dirname, '../docs/openapi.yaml');
const specs = YAML.load(swaggerPath);

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// ✅ Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Routes
app.use('/tasks', taskRoutes);

// ✅ Basic route to prevent 502 on root URL
app.get('/', (req, res) => {
  res.json({ message: 'Task API is running ✅', docs: '/api-docs' });
});

// ✅ PORT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on ${PORT}`));