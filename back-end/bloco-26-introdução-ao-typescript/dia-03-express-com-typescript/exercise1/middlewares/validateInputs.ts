import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/UserInterface';

const properties = ['name', 'email', 'password'];

const validateProperties = (user: User): [boolean, string | null] => {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

const validateValues = (user: User): [boolean, string | null] => {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

const validationUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  let [valid, property] = validateProperties(user);

  if (!valid) {
    return res.status(404).json({
      message: `O campo ${property} é obrigatório.`,
    });
  }

  [valid, property] = validateValues(user);

  if (!valid) {
    return res.status(404).json({
      message: `O campo ${property} não pode ser nulo ou vazio.`,
    });
  }

  next();
}

export default validationUser;