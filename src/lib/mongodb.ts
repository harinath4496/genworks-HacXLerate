import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise && uri) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise || (uri ? new MongoClient(uri, options).connect() : (null as any));
} else {
  clientPromise = uri ? new MongoClient(uri, options).connect() : (null as any);
}

export default clientPromise;

/**
 * Returns database instance (default: "clientora")
 */
export async function getDb(dbName = "clientora"): Promise<Db> {
  if (!clientPromise) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in runtime environment.");
    }
    clientPromise = new MongoClient(mongoUri, options).connect();
  }
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

/**
 * Returns the clientora User collection
 */
export async function getUsersCollection(): Promise<Collection<Document>> {
  const db = await getDb("clientora");
  return db.collection("User");
}

export interface ClientUserDoc {
  email: string;
  name: string;
  role: "CLIENT" | "BRAND";
  category?: "brand" | "agency" | "individual";
  authProvider: "google" | "credentials";
  firebaseUid?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  balanceInEscrow?: number;
}

/**
 * Find user by email in MongoDB clientora.User collection
 */
export async function findUserByEmail(email: string) {
  const users = await getUsersCollection();
  return users.findOne({ email: email.toLowerCase().trim() });
}

/**
 * Upsert client user upon Firebase Google login or registration
 */
export async function upsertClientUser(userData: {
  email: string;
  name: string;
  category?: "brand" | "agency" | "individual";
  authProvider: "google" | "credentials";
  firebaseUid?: string;
  avatarUrl?: string;
  passwordHash?: string;
}) {
  const users = await getUsersCollection();
  const normalizedEmail = userData.email.toLowerCase().trim();

  const now = new Date();
  const result = await users.findOneAndUpdate(
    { email: normalizedEmail },
    {
      $set: {
        name: userData.name || normalizedEmail.split("@")[0],
        category: userData.category || "brand",
        authProvider: userData.authProvider,
        firebaseUid: userData.firebaseUid,
        avatarUrl: userData.avatarUrl,
        updatedAt: now,
        ...(userData.passwordHash ? { passwordHash: userData.passwordHash } : {}),
      },
      $setOnInsert: {
        email: normalizedEmail,
        role: "BRAND",
        createdAt: now,
        balanceInEscrow: 0,
      },
    },
    { upsert: true, returnDocument: "after" }
  );

  return result;
}
