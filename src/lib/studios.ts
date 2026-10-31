export type TStudio = {
  /** Maps to MongoDB `_id` once fetched from the API */
  _id: string
  title: string
  rate: string
  deposit: string
  capacity: string
  location: string
  overview: string
  category: string
  amenities: string[]
  imageUrl: string
  username: string
  useremail: string
}