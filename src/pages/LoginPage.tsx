import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/react.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, remember);
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Empresa" className="w-12 h-12 mb-2" />
            <h1 className="text-xl font-semibold text-gray-900">Acesso ao Professor 10</h1>
            <p className="text-sm text-gray-500 mt-1">Entre com seu email corporativo</p>
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

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <a href="/recuperar-senha" className="text-sm text-blue-600 hover:underline">
                  Recuperar senha
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-300"
              />
              Manter logado
            </label>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Ao continuar, você concorda com as{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Políticas de Privacidade
            </a>{' '}
            e os{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Termos de Uso
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
