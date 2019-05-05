const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.type.ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  like: [
    {
      user: {
        type: Schema.type.ObjectId,
        ref: "user"
      }
    }
  ],
  comment: [
    {
      user: {
        type: Schema.type.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// 'user' is a name of table
module.exports = User = mongoose.model("post", PostSchema);
