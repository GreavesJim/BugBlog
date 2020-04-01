import mongoose from "mongoose";
import bug from "../models/Bug";

const _repository = mongoose.model("bug", bug);

class BugsService {
  async getAll() {
    return await _repository.find({});
  }
  async getById(id) {
    let data = await _repository.findById(id);
    return data;
  }
  async createBug(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async editBug(id, update) {
    let bug = await this.getById(id);
    // @ts-ignore
    if (bug.closed) {
      throw Error("cannot edit closed bug");
    }
    let data = await _repository.findOneAndUpdate({ _id: id }, update);
    return data;
  }
  async deleteBug(id) {
    let data = await _repository.findOneAndUpdate(
      { _id: id },
      { closed: true }
    );
    return data;
  }
}

const bugsService = new BugsService();
export default bugsService;
