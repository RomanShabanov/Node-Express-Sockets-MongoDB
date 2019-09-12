import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../users/users.model";

export interface IPet extends Document {
  name: string;
  owner: IUser["_id"];
}

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId }
});

const Pets = mongoose.model<IPet>("Pet", PetSchema);

Pets.find().then(pets => {
  if (!pets.length) {
    Pets.create([
      {
        name: "Milana"
      }
    ]);
  }
});

export default Pets;
