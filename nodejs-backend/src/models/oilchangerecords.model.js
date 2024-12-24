
    module.exports = function (app) {
        const modelName = 'oilchangerecords';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vehicleId: { type: Number, required: false, min: 0, max: 10000000 },
serviceRecordId: { type: Number, required: false, min: 0, max: 10000000 },
oilType: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
mileage: { type: Number, required: false, min: 0, max: 10000000 },
technicianId: { type: Number, required: false, min: 0, max: 10000000 },
dateOfChange: { type: Number, required: false, min: 0, max: 10000000 },

            
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