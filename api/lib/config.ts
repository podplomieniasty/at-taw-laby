export const config = {
    port: process.env.PORT || 3100,
    supportedPostCount: 15,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://twwai:KTp5wYwutrLHPLT@cluster0.ooees.mongodb.net/IoT?retryWrites=true&w=majority'
 };