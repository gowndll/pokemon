
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
  max-width: 480px; 
  height: 100vh;
  margin: 0 auto; 
  padding: 0 0; 
  border-radius: 20px; 
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto; 
  padding: 20px; 
  background: #333; 
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 100%;
`;


export default App;
