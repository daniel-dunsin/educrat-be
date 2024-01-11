import fs from 'fs';
import path from 'path';
import ServiceException from '../schema/exception/service.exception';

const basename = path.basename(__filename);

export default async function seedDatabase() {
     fs.readdir(__dirname, async (err, files) => {
          if (err) throw new ServiceException(500, 'Unable to read seeders');

          await Promise.all(
               files
                    .filter((file) => {
                         if (file.indexOf('.') != 0 && file != basename && file.endsWith('.seeder.ts')) {
                              return file;
                         }
                    })
                    .map(async (file) => {
                         return await import(path.join(__dirname, file));
                    })
          )
               .then(async (seeders) => {
                    for (const seeder of seeders) {
                         await seeder.default();
                    }

                    console.log('⚡[seeders]: db seeded successfully');
               })
               .catch((error) => {
                    console.error('Unable to import seeders', error);
               });
     });
}
