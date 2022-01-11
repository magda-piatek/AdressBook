import {Response} from 'express'

import {IRequest} from '../interfaces/request'
import {TContact} from '../types/contact'

import firestore from '../config/db-firebase'
import {parseContacts} from '../utils/parse-contacts'

export const createContact = async (req: IRequest<TContact>, res: Response) => {
  try {
    const data = req.body

    const {id} = await firestore.collection('contacts').add(data)

    res.status(200).json({success: true, id})
  } catch (err) {
    res.status(500).json({error: err})
  }
}

export const getContacts = async (_: any, res: Response) => {
  try {
    const contacts = await firestore.collection('contacts').get()

    const contactsList = parseContacts(contacts)

    res.status(200).json({success: true, result: contactsList})
  } catch (err) {
    res.status(500).json({error: err})
  }
}
