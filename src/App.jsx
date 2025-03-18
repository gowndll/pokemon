
import Main from './page/Main';
import Detail from './page/Detail';
import SearchPage from 'page/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './style/style.css'
import store from './store/store';
import {Provider} from 'react-redux';

function App() {

  return (
    <div className="App">
      <Provider store={store} value={{basename: "/"}}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Wrap>
            <Content>
              <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/detail/:id" element={<Detail />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
              </Routes>
            </Content>
          </Wrap>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

const Wrap = styled.div`
  position: relative;
  max-width: 480px; 
  height: 100vh;
  margin: 0 auto; 
  padding: 0 0; 
  border-radius: 20px; 
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left:0;
    right:0;
    height: 180px;
    background: center top / 100% auto url('https://gowndll.github.io/pokemon/assets/img/bg02-01.svg') no-repeat, center top / auto 180px url('https://gowndll.github.io/pokemon/assets/img/bg02-02.svg') no-repeat;
    z-index: 10;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    height: 180px;
    background: center top / 100% auto url('https://gowndll.github.io/pokemon/assets/img/bg02-01.svg') no-repeat, center top / auto 180px url('https://gowndll.github.io/pokemon/assets/img/bg02-02.svg') no-repeat;
    transform: rotate(180deg);
    z-index: 10;
  }
`;

const Content = styled.div`
  position: relative;
  max-width: calc(100% - 20px); 
  height: 100%;
  margin: 0 auto; 
  padding: 190px 20px; 
  background: linear-gradient(to right, rgb(178 251 255) 0, rgb(245 254 255) 1%, rgb(178 251 255) 4%, rgb(178 251 255) 96%, rgb(245 254 255) 99%, rgb(178 251 255) 100%); 
  overflow: auto; 
  &::-webkit-scrollbar {
    display: none;
  }
  
  
  /* &::before {
    content:""; 
    position: absolute; 
    right:15px; top: 140px; bottom: 140px; width: 5px; background-color:#fff;
    filter: blur(3px); z-index: 1;
  }
  &::after {
    content:""; 
    position: absolute; 
    left:15px; top: 140px; bottom: 140px; width: 5px; background-color:#fff;
    filter: blur(3px); z-index: 1;
  }  */
`;


export default App;
