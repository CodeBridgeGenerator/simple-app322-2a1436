
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerId: faker.lorem.sentence(1),
vehicleId: faker.lorem.sentence(1),
serviceDate: faker.lorem.sentence(1),
totalAmount: faker.lorem.sentence(1),
paymentStatus: faker.lorem.sentence(1),
paymentMethod: faker.lorem.sentence(1),
notes: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
