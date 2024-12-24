
    module.exports = function (app) {
        const modelName = 'servicerecords';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceId: { type: Number, required: false, min: 0, max: 10000000 },
serviceId: { type: Number, required: false, min: 0, max: 10000000 },
vehicleId: { type: Number, required: false, min: 0, max: 10000000 },
technicianId: { type: Number, required: false, min: 0, max: 10000000 },
serviceDate: { type: Number, required: false, min: 0, max: 10000000 },

            
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