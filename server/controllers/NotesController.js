import express from "express";
import notesService from "../services/notesService";

export default class NotesController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAllNotes)
      .get(":/id", this.getNotesById)
      .post("", this.createNote)
      .delete(":/id", this.deleteNote);
  }

  //TODO Retool method parameters
  async getAllNotes(req, res, next) {
    try {
      let data = await notesService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getNotesById(req, res, next) {
    try {
      let data = await notesService.getNotesById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async createNote(req, res, next) {
    try {
      let data = await notesService.createNote(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req, res, next) {
    try {
      await notesService.deleteNote(req.params.id);
    } catch (error) {
      next(error);
    }
  }
}
