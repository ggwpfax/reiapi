const express = require('express');
const app = express();
const port = 5500; 
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('data.db')

// Define your API endpoint
app.post('/api/trasher', (req, res) => {
  const newData = req.body; 

  // Insert the data into the SQLite database
  const stmt = db.prepare('INSERT INTO trasherplate (orderno, itemno, date, itemname, quantity, foundryname, castpo, castpodate, quantitysent, patternno, receivedquantity, castreceivedrate, , dispatch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

  newData.forEach((data) => {
    const {
      orderNo,
      itemNo,
      date,
      itemName,
      quantity,
      foundryName,
      castPo,
      castPoDate,
      quantitySent,
      patternNo,
      receivedQuantity,
      castReceivedDate,
      machiningDetails,
      dispatch,
    } = data;

    stmt.run(
      itemNo,
      date,
      itemName,
      quantity,
      foundryName,
      castPo,
      castPoDate,
      quantitySent,
      patternNo,
      receivedQuantity,
      castReceivedDate,
      JSON.stringify(machiningDetails),
      dispatch
    );
  });

  stmt.finalize();

  res.json({ message: 'Trasher Data received successfully' });
});

app.post('/api/scrapper', (req, res) => {
  // Handle the request and send the response
  res.json({ message: 'Scrapper Data received successfully' });
});

app.post('/api/pinion', (req, res) => {
  // Handle the request and send the response
  res.json({ message: 'Pinion Data received successfully' });
});

app.post('/api/sprocket', (req, res) => {
  // Handle the request and send the response
  res.json({ message: 'Sprocket Data received successfully' });
});

app.post('/api/other', (req, res) => {
  // Handle the request and send the response
  res.json({ message: 'Other Component Data received successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
