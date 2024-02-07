import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import axiosApi from './axiosApi';

const App = () => {
  const [urlText, setUrlText] = useState('');

  const changeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setUrlText(value);
  };

  const shortenUrl = async (event: FormEvent) => {
    event.preventDefault();
    await axiosApi.post('/links', {url: urlText});
  };

  return (
    <div className="container">
        <form onSubmit={shortenUrl} className="centerForm">
          <div className="fieldBlock">
            <h4 className="title">Shorten you link!</h4>
            <input
              onChange={changeUrl}
              value={urlText}
              className="field"
              type="text"
              placeholder="Enter your url"
            />
          </div>
          <button type="submit" className="button">Shorten</button>
        </form>
    </div>
  );
};

export default App;