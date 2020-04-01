import express from "express";
import bugsService from "../services/BugsService";

export default class BugController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAllBugs)
      .get("/:id", this.getById)
      .post("", this.createBug)
      .put("/:id", this.editBug)
      .delete("/:id", this.deleteBug);
  }

  //TODO Retool method parameters
  async getAllBugs(req, res, next) {
    try {
      let data = await bugsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async createBug(req, res, next) {
    try {
      let data = await bugsService.createBug(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async editBug(req, res, next) {
    try {
      let data = await bugsService.editBug(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteBug(req, res, next) {
    try {
      await bugsService.deleteBug(req.params.id);
      res.send("deleted");
    } catch (error) {
      next(error);
    }
  }
}
