const { Pool } = require('pg');

const passwordsToTest = ['postgres', 'admin', 'root', 'password', '1234', '12345', 'postgres123', 'postgre123', ''];

async function testPasswords() {
  console.log("Testing common passwords...");
  for (let pass of passwordsToTest) {
    try {
      const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres', // we test on the default DB just in case Consultancy doesn't exist
        password: pass,
        port: 5432,
      });
      
      const client = await pool.connect();
      console.log(`\n✅ SUCCESS! Your PostgreSQL password is: "${pass}"`);
      client.release();
      await pool.end();
      return;
    } catch (err) {
      if (err.code === '28P01') {
        process.stdout.write('.'); // Wrong password, keep trying
      } else {
        console.log(`\nDatabase connection failed with different error: ${err.message}`);
        return;
      }
    }
  }
  
  console.log("\n❌ Could not guess your password. You will need to reset it in pgAdmin or your pg_hba.conf file.");
}

testPasswords();
