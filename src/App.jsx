
import Main from './page/Main';
import Detail from './page/Detail';
import SearchPage from 'page/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './style/style.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  );
}

const Wrap = styled.div`
  position: relative;
  padding: 100px 0; 
  background-color: #ededed;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto; 
  padding: 20px; 
  max-width: 1200px; 
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 100%;
`;



export default App;
