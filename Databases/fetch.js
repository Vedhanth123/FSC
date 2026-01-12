import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';

(async () => {
  const db = new PGlite('./my_car_database');
  // ... (your existing setup code above)

// 1. Load the SQL query file (You are already doing this)
  const query = fs.readFileSync('query.sql', 'utf8');

  // 2. Run the query and capture the response

//   const tables = ['staff', 'cars', 'sold_cars','dealerships'];

    const response = await db.query(query);

    const rows = response.rows;
    
    if (rows.length > 0) {
      // 1. Get the headers (the keys of the first object)
      const headers = Object.keys(rows[0]).join(',');
    
      // 2. Map each row object into a comma-separated string
      const csvData = rows.map(row => 
        Object.values(row).join(',')
      ).join('\n');
    
      // 3. Combine headers and data
      const finalCSV = `${headers}\n${csvData}`;
    
      // 4. Write to a file
      fs.writeFileSync(`$answer.csv`, finalCSV);
      
      console.log(`✅ Success! You can now open answer.csv in Excel or Google Sheets.`);
      } else {
        console.log("⚠️ The query returned no data, so no CSV was created.");
      }

  // 3. Convert the data to a String (like json.dumps() in Python)
  // ... after your query response ...
})();
