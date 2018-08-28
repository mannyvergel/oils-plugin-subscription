const mongoose = web.require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = {
  schema: {
    subsId: {type: String},
    user: {type:ObjectId, required: true},
    createDt: {type: Date, default: Date.now},
  },

  initSchema: function(mySchema) {
    mySchema.index({subsId: 1, user: 1}, {unique: true});
  }
}