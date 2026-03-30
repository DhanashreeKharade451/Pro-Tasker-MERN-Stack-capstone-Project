import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },

    description: {
        type: String,
        required: true,
    },

    //Example field in projectSchema
user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
},{ timestamps: true }); 

const Project = mongoose.model("Project", projectSchema);
export default Project;