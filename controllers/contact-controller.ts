import {Response} from 'express'

import {IRequest} from '../interfaces/request'
import {TContact} from '../types/contact'

import firestore from '../config/db-firebase'

export const create = async (req: IRequest<TContact>, res: Response) => {
  try {
    const data = req.body

    const contact = await firestore.collection('contacts').doc().set(data)

    res.status(200).json({success: true, contact})
  } catch (err) {
    console.log(err)

    res.status(500).json({error: err})
  }
}
