import { Pinecone } from "@pinecone-database/pinecone";      

const pinecone = new Pinecone();      
await pinecone.init({      
	environment: "us-west1-gcp-free",      
	apiKey: process.env.PINECONE_API_KEY,      
});      
const index = pinecone.Index("magellan");