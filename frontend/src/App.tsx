import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import axiosApi from './axiosApi';
import { LinkData } from './types';
import { BASE_URL } from './constants';

const App = () => {
  const [urlText, setUrlText] = useState('');
  const [response, setResponse] = useState<LinkData>({
    shortUrl: '',
  });

  const changeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setUrlText(value);
  };

  const shortenUrl = async (event: FormEvent) => {
    event.preventDefault();
    const result = await axiosApi.post<LinkData>('/links', {url: urlText});
    setResponse(result.data);
  };

  return (
    <div className="container">
      <div className="centerForm">
        <form onSubmit={shortenUrl}>
          <div className="fieldBlock">
            <h4 className="title">Shorten you link!</h4>
            <input
              onChange={changeUrl}
              value={urlText}
              className="field"
              type="url"
              placeholder="Enter your url"
              required
            />
          </div>
          <button type="submit" className="button">Shorten</button>
        </form>
        {
          response.shortUrl.length !== 0 ?
            <div className="text">
              <p>Your link now looks like this:</p>
              <a href={BASE_URL + '/' + response.shortUrl} target="_blank">{BASE_URL + '/' + response.shortUrl}</a>
            </div>
            :
            null
        }
      </div>
    </div>
  );
};

export default App;