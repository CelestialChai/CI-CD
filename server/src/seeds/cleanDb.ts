import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string): Promise<void> => {
  try {
    // Check if the model exists in models
    if (!models[modelName]) {
      throw new Error(`Model "${modelName}" does not exist in models.`);
    }

    // Ensure the db property exists
    const database = models[modelName]?.db?.db;
    if (!database) {
      throw new Error(`Database for model "${modelName}" is not accessible.`);
    }

    // List collections and check if the collection exists
    const modelExists = await database.listCollections({ name: collectionName }).toArray();

    if (modelExists?.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error in cleanDb: ${err.message}`);
    } else {
      console.error('Error in cleanDb:', err);
    }
    throw err;
  }
};
