import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, [])
  
  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const URL=process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    console.log(URL)
    fetch(URL,{
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime
      })
    }).then((response) => {
      response.json().then((json) => {
        getTransactions().then(setTransactions);
        setDatetime('');
        setName('');
        setDescription('');
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } 

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  balance=balance.toFixed(2);
  const fraction =balance.split('.')[1];
  balance=balance.split('.')[0];
  
  return (
    <div className='parent'>
    <h1 className='Title'>Money Tracker</h1>
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'+300 SONY TV'} />
          <input
            type="date"
            value={datetime}
            onChange={ev => setDatetime(ev.target.value)} />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={'description'} />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div>
        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction => (
              <div className={"transaction"}>
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={"price "+(transaction.price < 0 ? 'red' : "green")}></div>
                  <div className="datetime">{transaction.datetime.substring(0, 10)}</div>  
                </div>
              </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);
}
export default App;
