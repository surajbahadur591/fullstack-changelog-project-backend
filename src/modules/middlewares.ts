import { body, validationResult } from 'express-validator'


export const InputValidator = (req, res , next) => {
    const err = validationResult(req)
    console.log(err)
    if(!err.isEmpty()){
        res.status(400)
        res.json({ errors : err.array()})
    }
    else {
        next()
    }
}