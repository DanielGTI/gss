import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg';

const RecoverPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula envio de recuperação de senha e retorna à tela de login
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Empresa" className="w-12 h-12 mb-2" />
            <h1 className="text-xl font-semibold text-gray-900">Recuperar senha</h1>
            <p className="text-sm text-gray-500 mt-1">Informe seu email corporativo</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                placeholder="voce@empresa.com.br"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Recuperar senha
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Voltar ao login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;

