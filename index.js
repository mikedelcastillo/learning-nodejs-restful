const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {id: 1, name: 'Mike'},
  {id: 2, name: 'Meg'},
  {id: 3, name: 'Meg&Mike'}
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id == parseInt(req.params.id));

  if(!course){
    res.status(404).send('The course was not found.');
  } else{
    res.send(course);
  }
});

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
  }

  const course = courses.find(c => c.id == parseInt(req.params.id));

  course.name = req.body.name;
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  console.log(courses);
});
