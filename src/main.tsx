import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/MainPage.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CadastrarEncomendaPage from './pages/CadastrarEncomendaPage.tsx';
import ConcluirEncomendaPage from './pages/ConcluirEncomendaPage.tsx';
import RelatorioPage from './pages/RelatorioPage.tsx';
import CadastrarProdutoPage from './pages/CadastrarProdutoPage.tsx';
import RemoverProdutoPage from './pages/RemoverProdutoPage.tsx';
import AtualizarPrecoPage from './pages/AtualizarPrecoPage.tsx';
import Layout from './components/partials/Layout.tsx';
import GlobalContextProvider from './context/GlobalContext.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/cadastrar-encomenda',
        element: <CadastrarEncomendaPage />,
      },
      {
        path: '/concluir-encomenda',
        element: <ConcluirEncomendaPage />,
      },
      {
        path: '/relatorio',
        element: <RelatorioPage />,
      },
      {
        path: '/cadastrar-produto',
        element: <CadastrarProdutoPage />,
      },
      {
        path: '/remover-produto',
        element: <RemoverProdutoPage />,
      },
      {
        path: '/atualizar-preco',
        element: <AtualizarPrecoPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>
);
