import { Client, Databases, Users, Storage, Account, Messaging } from "node-appwrite";
export const {
  NEXT_PUBLIC_ENDPOINT:ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  LABTEST_COLLECTION_ID ,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject("6717ba3f003448972ea1")
.setKey("standard_88c193f726b1b79b7bfe0c4e8daa17c70fbc4409df2880ef0d485a6b7acbfd6a7bf67d2223f92a3832af613b2ba9e496fd16991dcdaf2812b049718f3a32557287b1680950ebee00a524976e21b332d36854aa8a717cd2475f33eb97eeb5afd8278f00d1c5df177614f0fd0c2f13ede7c6cca2ac1d20f3bf07e3f7b6b0960b8a");

export const databases = new Databases(client);
export const users = new Users(client);
export const messaging = new Messaging(client);
export const storage = new Storage(client);
export const account = new Account(client);