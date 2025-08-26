import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  MessageCircle, 
  Bot, 
  Send, 
  Settings, 
  BarChart3,
  CheckCircle,
  Zap,
  MessageSquare,
  User,
  Search,
  Plus,
  TrendingUp,
  Activity
} from 'lucide-react';

const WhatsAppIntegrationSimple = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">IA do WhatsApp</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Automação
          </Button>
        </div>
      </div>

      {/* Status de Conexão */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${whatsappConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <h3 className="font-semibold">Status da Conexão</h3>
                <p className="text-sm text-gray-600">
                  {whatsappConnected 
                    ? 'Conectado - DentCare Pro' 
                    : 'Desconectado - Configure sua conta WhatsApp Business'}
                </p>
              </div>
            </div>
            {!whatsappConnected && (
              <Button onClick={() => setWhatsappConnected(true)}>
                <Zap className="w-4 h-4 mr-2" />
                Conectar WhatsApp
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversas Ativas</CardTitle>
            <MessageCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-green-600">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
            <Send className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80</div>
            <p className="text-xs text-green-600">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79%</div>
            <p className="text-xs text-green-600">Média geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automações Ativas</CardTitle>
            <Bot className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-green-600">Funcionando</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="automations">Automações</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lembrete enviado</p>
                    <p className="text-xs text-gray-600">Maria Silva - Consulta amanhã</p>
                  </div>
                  <span className="text-xs text-gray-500">2h atrás</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nova conversa</p>
                    <p className="text-xs text-gray-600">António Santos - Reagendamento</p>
                  </div>
                  <span className="text-xs text-gray-500">4h atrás</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Automação ativada</p>
                    <p className="text-xs text-gray-600">Follow-up pós-tratamento</p>
                  </div>
                  <span className="text-xs text-gray-500">6h atrás</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance das Automações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance das Automações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Lembrete de Consulta</span>
                    <span className="text-sm text-gray-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>45 enviadas</span>
                    <span>35 respostas</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confirmação de Agendamento</span>
                    <span className="text-sm text-gray-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>23 enviadas</span>
                    <span>22 respostas</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Follow-up Pós-Tratamento</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>12 enviadas</span>
                    <span>8 respostas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Pesquisar conversas..." className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    MS
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">Maria Silva</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">+351912345678</p>
                    <p className="text-sm text-gray-800 truncate mb-2">Obrigada pela confirmação da consulta!</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800" size="sm">ativa</Badge>
                      <span className="text-xs text-gray-500">2h atrás</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    AS
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">António Santos</h3>
                      <Badge variant="destructive" className="text-xs">2</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">+351925678901</p>
                    <p className="text-sm text-gray-800 truncate mb-2">Posso remarcar para amanhã?</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-yellow-100 text-yellow-800" size="sm">pendente</Badge>
                      <span className="text-xs text-gray-500">4h atrás</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    CO
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">Catarina Oliveira</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">+351934567890</p>
                    <p className="text-sm text-gray-800 truncate mb-2">Muito obrigada pelo atendimento!</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800" size="sm">resolvida</Badge>
                      <span className="text-xs text-gray-500">1 dia atrás</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    Lembrete de Consulta
                  </CardTitle>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Trigger:</span> appointment reminder
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Timing:</span> 24h
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  Olá! Lembramos que tem consulta marcada para amanhã às...
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enviadas: 45</span>
                  <span className="text-green-600">Taxa: 78%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    Confirmação de Agendamento
                  </CardTitle>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Trigger:</span> appointment scheduled
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Timing:</span> immediate
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  Consulta agendada com sucesso! Sua consulta está marcada...
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enviadas: 23</span>
                  <span className="text-green-600">Taxa: 95%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    Follow-up Pós-Tratamento
                  </CardTitle>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Trigger:</span> treatment completed
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Timing:</span> 48h
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  Como está se sentindo após o tratamento? Se tiver alguma...
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enviadas: 12</span>
                  <span className="text-green-600">Taxa: 65%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Boas-vindas
                  </CardTitle>
                  <Badge variant="outline">welcome</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                  Olá! Bem-vindo à DentCare Pro! 🦷<br/><br/>
                  Sou a assistente virtual e estou aqui para ajudar com:<br/>
                  • Agendamentos<br/>
                  • Informações sobre tratamentos<br/>
                  • Dúvidas gerais<br/><br/>
                  Como posso ajudar hoje?
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usado 156 vezes</span>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Agendamento Disponível
                  </CardTitle>
                  <Badge variant="outline">appointment</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                  Temos as seguintes opções disponíveis:<br/><br/>
                  📅 Segunda às 14:00<br/>
                  📅 Terça às 10:30<br/>
                  📅 Quarta às 16:00<br/><br/>
                  Qual horário prefere?
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usado 89 vezes</span>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Instruções Pós-Tratamento
                  </CardTitle>
                  <Badge variant="outline">treatment</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                  Instruções importantes após seu tratamento:<br/><br/>
                  • Evite alimentos duros nas próximas 24h<br/>
                  • Mantenha boa higiene oral<br/>
                  • Em caso de dor, tome o medicamento prescrito<br/>
                  • Retorne em caso de desconforto<br/><br/>
                  Cuidamos de você! 💙
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usado 34 vezes</span>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegrationSimple;

