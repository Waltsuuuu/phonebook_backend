const mongoose = require("mongoose");


const password = process.argv[2];

const url = `mongodb+srv://waltteriheino:${password}@phonebook.zelxs.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);


if (process.argv.length < 4) {
    
    Person.find({}).then((persons) => {
        console.log("phonebook:")
        persons.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else {

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
})

};