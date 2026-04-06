import bcryptjs from 'bcryptjs';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const migratePasswords = async () => {
  try {
    // Get all users
    db.query('SELECT id, password FROM users', async (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        process.exit(1);
      }

      console.log(`Found ${results.length} users to migrate...`);

      for (const user of results) {
        // Check if already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
        if (user.password.startsWith('$2')) {
          console.log(`User ${user.id}: Already hashed, skipping`);
          continue;
        }

        try {
          // Hash the plain text password
          const hashedPassword = await bcryptjs.hash(user.password, 10);
          
          // Update in database
          db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, user.id],
            (err) => {
              if (err) {
                console.error(`Error updating user ${user.id}:`, err);
              } else {
                console.log(`✓ User ${user.id} password migrated`);
              }
            }
          );
        } catch (error) {
          console.error(`Error hashing password for user ${user.id}:`, error);
        }
      }

      setTimeout(() => {
        console.log('✓ Migration complete!');
        process.exit(0);
      }, 2000);
    });
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

migratePasswords();
