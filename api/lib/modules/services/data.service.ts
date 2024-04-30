import { IData, Query } from "../models/data.model";
import DataSchema from "../schemas/data.schema"

class DataService {
    public async createPost(dataParams: IData) {
        try {
            const dataModel = new DataSchema(dataParams);
            await dataModel.save();
        } catch (err) {
            console.error('Wystąpił błąd podczas tworzenia danych:', err);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await DataSchema.find(query, { __v: 0, _id: 0 });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async deleteData(query: Query<number | string | boolean>) {
        try {
            await DataSchema.deleteMany(query);
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    public async deleteAllPosts() {
        try {
            const res = await DataSchema.deleteMany();
            return res;
        } catch (err) {
            throw new Error(`Query failed: ${err}`);
        }
    }

    public async fetchPosts() {
        try {
            const res = await DataSchema.find();
            return res;
        } catch (err) {
            throw new Error(`Query failed: ${err}`);
        }
    }
 
}

export default DataService;