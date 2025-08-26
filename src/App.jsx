import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import AgendaCalendar from './components/AgendaCalendar.jsx'
import PatientManagement from './components/PatientManagementComplete.jsx'
import TreatmentManagement from './components/TreatmentManagement.jsx'
import WhatsAppIntegration from './components/WhatsAppIntegrationSimple.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import toast, { Toaster } from 'react-hot-toast'
import { 
  Activity,
  Calendar,
  Users,
  Stethoscope,
  MessageSquare,
  DollarSign,
  Package,
  TrendingUp,
  Box,
  BarChart3,
  Download,
  RefreshCw,
  LogOut
} from 'lucide-react'
import './App.css'

// Componente principal refatorado
function DentCareApp() {
  const { isAuthenticated, user, login, logout, loading } = useAuth();
  const [currentSection, setCurrentSection] = useState('inteligencia');
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData.username, loginData.password);
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success(`Bem-vindo, ${result.user.name}!`);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentSection('inteligencia');
    setLoginData({ username: '', password: '' });
  };

  const menuItems = [
    { id: 'inteligencia', label: 'Inteligência', icon: Activity, color: 'bg-blue-500' },
    { id: 'agenda', label: 'Agenda', icon: Calendar, color: 'bg-orange-500' },
    { id: 'pacientes', label: 'Pacientes', icon: Users, color: 'bg-purple-500' },
    { id: 'tratamentos', label: 'Tratamentos', icon: Stethoscope, color: 'bg-green-500' },
    { id: 'whatsapp', label: 'IA do WhatsApp', icon: MessageSquare, color: 'bg-pink-500' },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign, color: 'bg-red-500' },
    { id: 'protese', label: 'Controle de Prótese', icon: Package, color: 'bg-orange-600' },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp, color: 'bg-teal-500' },
    { id: 'estoque', label: 'Estoque', icon: Box, color: 'bg-pink-600' }
  ]

  const renderContent = () => {
    switch (currentSection) {
      case 'agenda':
        return <AgendaCalendar />
      case 'pacientes':
        return <PatientManagement />
      case 'tratamentos':
        return <TreatmentManagement />
      case 'whatsapp':
        return <WhatsAppIntegration />
      case 'financeiro':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Sistema financeiro em desenvolvimento.</p>
              </CardContent>
            </Card>
          </div>
        )
      case 'protese':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Controle de Prótese</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Sistema de controle de próteses em desenvolvimento.</p>
              </CardContent>
            </Card>
          </div>
        )
      case 'marketing':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Sistema de marketing em desenvolvimento.</p>
              </CardContent>
            </Card>
          </div>
        )
      case 'estoque':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Sistema de controle de estoque em desenvolvimento.</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Inteligência</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar Dados
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-green-600">+3 vs ontem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-green-600">+5% vs semana anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€24,580</div>
                  <p className="text-xs text-green-600">+15.2% vs mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Novos Pacientes</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-green-600">+34% vs mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cancelamentos</CardTitle>
                  <Calendar className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-red-600">+1 vs ontem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Satisfação Média</CardTitle>
                  <Activity className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7/5</div>
                  <p className="text-xs text-green-600">+0.2 vs mês anterior</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">DentCare Pro</CardTitle>
            <p className="text-gray-600">Sistema Inteligente para Clínicas Odontológicas</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar no Sistema
              </Button>
            </form>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">Credenciais de Demonstração:</p>
              <p className="text-sm text-blue-600">Usuário: admin</p>
              <p className="text-sm text-blue-600">Senha: dentcare2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">DentCare Pro</h1>
              <p className="text-sm text-gray-600">Sistema Inteligente</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentSection === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setCurrentSection(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair do Sistema
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  )
}

// Componente App principal com AuthProvider
function App() {
  return (
    <AuthProvider>
      <DentCareApp />
    </AuthProvider>
  );
}

export default App

