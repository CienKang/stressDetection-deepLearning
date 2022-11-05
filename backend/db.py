import pymongo
import os

class Database():
    def __init__(self, conn_str):
        self.client = pymongo.MongoClient(conn_str)

    # user={"_id":"admin", "password": "1234"}
    def insertUser(self, user):
        db = self.client["users"]
        collection = db["users"]
        collection.insert_one(user)

    def findUser(self, user):
        db = self.client["users"]
        collection = db["users"]
        return collection.find_one(user)

if __name__=="__main__":
    db=Database(os.getEnv("MONGO_CONN_STR"))
    db.insertUser({"_id":"admin", "password": "1234"})
    print(db.findUser({"_id":"ad"}))