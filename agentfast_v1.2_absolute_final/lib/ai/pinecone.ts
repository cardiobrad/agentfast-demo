import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const getPineconeIndex = () => {
  return pinecone.index(process.env.PINECONE_INDEX_NAME!);
};

export const queryPinecone = async (vector: number[], topK: number = 5) => {
  const index = getPineconeIndex();
  const queryResponse = await index.query({
    vector,
    topK,
    includeMetadata: true,
  });
  return queryResponse.matches;
};
