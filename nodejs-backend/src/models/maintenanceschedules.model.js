
    module.exports = function (app) {
        const modelName = 'maintenanceschedules';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vehicleId: { type: Number, required: false, min: 0, max: 10000000 },
serviceId: { type: Number, required: false, min: 0, max: 10000000 },
nextServiceDate: { type: Number, required: false, min: 0, max: 10000000 },
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