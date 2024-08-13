import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const CategoryModel =
  mongoose.models.Category as mongoose.Model<ICategory> ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
