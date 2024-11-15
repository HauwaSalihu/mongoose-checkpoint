import "dotenv/config";

import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
    },
    favoritefoods: {
      type: Array,
    },
  },

  { timestamps: true }
);
const person = mongoose.model("person", personSchema);
//for creating new documents
async function addPerson() {
  const personOne = await person.create({
    fullName: " Lynda Hauwa",
    age: "27",
    favoritefoods: ["garri", "milk"],
  });
  console.log(personOne);
}
//add many documents
async function addPeople() {
  const peopleDocuments = [
    {
      fullName: "Alan Turing",
      age: "45",
      favoritefoods: ["rice", "Spaghetti", "masa"],
    },
    {
      fullName: "Chinyere Okoro",
      age: "35",
      favoritefoods: ["tacos", "Spaghetti", "pasta"],
    },
    {
      fullName: "Ugo Maduekwe",
      age: "50",
      favoritefoods: ["oha soup", "ofensala", "akpu"],
    },
    {
      fullName: "Hauwa Salihu",
      age: "25",
      favoritefoods: ["rice", "garri", "vegetable"],
    },
  ];
  // Insert the documents into the specified collection
  const p = await person.insertMany(peopleDocuments);
  console.log(p);
}
//for searching a document
async function findPeople() {
  const p = await person.find({
    fullName: "Alan Turing",
  });

  console.log(p);
}

//for searching a document
async function findPerson() {
  const p = await person.findOne({
    favoritefoods: "tacos",
  });

  console.log(p);
}
//for finding by id
async function findById() {
  const p = await person.findOne({ _id: "673200e62da2d2c46dc0a5f0" });
  console.log("user found successfully");
  console.log(p);
}
//for finding by id
async function classicUpdate() {
  const p = await person.findOne({ _id: "673247d5c6de747a2898f34b" });
  console.log("user found successfully");
  p.favoritefoods.push("hamburger");
  await p.save();
  console.log("document updated successfully");
  console.log(p);
}
///for updatin a contact

async function updatePerson() {
  const updatePerson = await person.findOneAndUpdate(
    {
      fullName: "Lynda Hauwa",
    },
    { age: "20" },
    {
      new: true,
    }
  );
  console.log(updatePerson);
}
//for deleting a contact
async function deletePerson() {
  await person.deleteOne({ _id: "673200e62da2d2c46dc0a5f0" });
  console.log("user deleted successfully");
} //for deleting a contact
async function deletePeople() {
  // Insert the documents into the specified collection
  const p = await person.deleteMany({ fullName: "Alan Turing" });
  console.log(p);

  console.log("users deleted successfully");
}
//chaining methods
async function methodChain() {
  const peopleChain = await person
    .find({ favoritefoods: "akpu" })
    .sort("fullName")
    .limit(2)
    .select({ age: 0 })
    .exec();

  console.log(peopleChain);
}
//for establishing connection to mongodb
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to database successfully");
    await methodChain();
    console.log("Person added successfully");
  } catch (error) {
    console.log(error);
  }
}
connectToDatabase();
