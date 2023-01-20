import { createServer } from "http";
import { MongoClient } from "mongodb";

const PORT = process.env.PORT || 3001;
createServer(async (req, res) => {
  const uri = `mongodb+srv://mongouser:${process.env.dbpass}@cluster0.wikzryx.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("react-shop");
    const coll = db.collection("products");
    const cursor = coll.find({});
    const products = await cursor.toArray();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}).listen(PORT, () => console.log(`Node.js server is listening at ${PORT}`));
