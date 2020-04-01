import mongoose from "mongoose";
import note from "../models/Note";

const _repository = mongoose.model("note", note);

class NotesService {
  async getNotesById(id) {
    let data = await _repository.findById(id);
    return data;
  }
  async createNote(body) {
    let data = await _repository.create(rawData);
    return data;
  }
  async deleteNote(id) {
    let data = await _repository.findOneAndUpdate(
      { _id: id },
      { closed: true }
    );
  }
  async getAll() {
    return await _repository.find({});
  }
}

const notesService = new NotesService();
export default notesService;
