
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerId: faker.lorem.sentence(1),
make: faker.lorem.sentence(1),
model: faker.lorem.sentence(1),
year: faker.lorem.sentence(1),
licensePlate: faker.lorem.sentence(1),
vin: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
