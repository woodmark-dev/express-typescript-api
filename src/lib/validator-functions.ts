import { body, param } from "express-validator";
export function validateNoteTitle() {
  return body("title").notEmpty().isString().trim().escape();
}

export function validateNoteBody() {
  return body("body").notEmpty().isString().trim().escape();
}

export function validateIdParam() {
  return param("id").toInt().isInt();
}
