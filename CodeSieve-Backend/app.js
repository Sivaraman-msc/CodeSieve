const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const { DBconnect } = require('./config/Database');
const { AuthRouter } = require('./routers/AuthRouter');
const { QuestionRouter } = require('./routers/QuestionRouter');
const { InterviewRouter } = require('./routers/InterviewRouter');
const { SubmissionRouter } = require('./routers/SubmissionRouter');
const { EvRouter } = require('./routers/EvaluationRouter');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:5173',credentials:true }));

app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

DBconnect();

app.get('/', (req, res) => {
    res.json('Connected');
});

app.use('/CodeSieve/Auth', AuthRouter);
app.use('/CodeSieve/Question', QuestionRouter);
app.use('/CodeSieve/Interview', InterviewRouter);
app.use('/CodeSieve/Submission', SubmissionRouter);
app.use('/CodeSieve/Data', EvRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
