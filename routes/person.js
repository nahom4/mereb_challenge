const express = require('express')
let persons  = require('../schema/personDatabase')
router = express.Router()
const personModel = require('../model/personModel')
const uuid = require('uuid')


// Get all persons

router.get('/',(req,res) => {

    return res.json(persons)
})

// Get person 
router.get('/:id', (req,res) => {
   
    // check if a person with a specified id  exists
    found = persons.some(person => person.id === (req.params.id))
    if (found){
        var value =  persons.filter(person => person.id === req.params.id)
        return res.json(value[0])
    }

    else
    {return res.status(404).json({msg: "person not found"})}

})

// add person
router.post('/',(req,res) => {
    const { error, value } = personModel.validate(req.body);

    if (error){
        return res.status(400).json({msg:"improper format"})
    }
    else
   { req.body.id = uuid.v4()
    persons.push(req.body)
    return res.json(req.body)}
})


router.put('/:id',(req,res) => {
    found = persons.some(person => person.id === (req.params.id))
    updatedPerson = req.body

    if(found){
        persons.forEach(person => {

        if (person.id == req.params.id){
            person.name = updatedPerson.name ? updatedPerson.name : person.name
            person.age = updatedPerson.age ? updatedPerson.age : person.age
            person.hobbies = updatedPerson.hobbies ? updatedPerson.hobbies : person.hobbies

            return res.json(person)

        }
     
    })
}

    else{
        return res.status(400).json({msg: "unable to perform update"})
    }

})

router.delete('/:id',(req,res) => {
    let personIndex = persons.findIndex(p => p.id == req.params.id);
    if (personIndex == -1) {
        res.sendStatus(404);
    } else {
        persons.splice(personIndex, 1);
        res.sendStatus(200);
    }
   

})



module.exports = router