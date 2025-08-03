import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import logger from './utils/logger';
import 'tsconfig-paths/register';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(
        morgan(':method :url :status :response-time ms', {
            stream: {
                write: message => logger.info(message.trim()), // write to file
            },
        })
    );
} else {
    app.use(morgan('dev'));
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
