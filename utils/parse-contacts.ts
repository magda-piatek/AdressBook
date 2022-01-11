export const parseContacts = (contacts: Record<string, any>) =>
  contacts.docs.reduce((acc: Array<Record<string, string>>, doc: any) => {
    acc.push(doc.data())
    return acc
  }, [])
