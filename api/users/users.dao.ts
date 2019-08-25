import mongoose from "mongoose";
import User, { IUserDocument } from "./users.model";

User.statics = {
  create: function(data: IUserDocument, cb: any) {
    var hero = new this(data);
    hero.save(cb);
  },

  get: function(query: any, cb: any) {
    this.find(query, cb);
  },

  getByName: function(query: any, cb: any) {
    this.find(query, cb);
  },

  update: function(query: any, updateData: any, cb: any) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function(query: any, cb: any) {
    this.findOneAndDelete(query, cb);
  }
};

var herosModel = mongoose.model("Heros", User);
module.exports = herosModel;
