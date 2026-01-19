const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true,lowercase:true },
    password: { type: String, required: true, minlength: 8, select: false},
  },
  { timestamps: true }
);

// ---- MUST BE BEFORE EXPORT ----
userSchema.pre("save", async function () {
  console.log("👉 inside pre hook");

  if (!this.isModified("password")) return;

  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  catch(err){
    throw new Error(`Password hashing failed: ${err.message}`);
  }
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// ---- EXPORT AFTER EVERYTHING ----
const User = mongoose.model("User", userSchema);
module.exports = User;

