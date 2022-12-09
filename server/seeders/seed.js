const db = require('../config/connection');
const { User, Charger } = require('../models');
const userSeeds = require('./userSeeds.json');
const chargerSeeds = require('./chargerSeeds.json');

db.once('open', async () => {
  try {
    await Charger.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < chargerSeeds.length; i++) {
      const { _id, chargerOwner } = await Charger.create(chargerSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: chargerOwner },
        {
          $addToSet: {
            chargers: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
