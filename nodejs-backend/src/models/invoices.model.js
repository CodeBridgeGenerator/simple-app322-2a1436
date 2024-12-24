
    module.exports = function (app) {
        const modelName = 'invoices';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerId: { type: Number, required: false, min: 0, max: 10000000 },
vehicleId: { type: Number, required: false, min: 0, max: 10000000 },
serviceDate: { type: Number, required: false, min: 0, max: 10000000 },
totalAmount: { type: Number, required: false, min: 0, max: 10000000 },
paymentStatus: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
paymentMethod: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
notes: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };