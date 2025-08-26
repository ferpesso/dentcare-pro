import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { 
  MessageCircle, 
  Bot, 
  Send, 
  Phone, 
  Calendar, 
  Clock, 
  Users, 
  Settings, 
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  MessageSquare,
  Bell,
  User,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  Target,
  TrendingUp,
  Activity,
  Smartphone,
  Globe,
  Shield,
  Star,
  Heart,
  ThumbsUp,
  Smile
} from 'lucide-react';
import toast from 'react-hot-toast';

const WhatsAppIntegration = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [conversations, setConversations] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [whatsappConfig, setWhatsappConfig] = useState({
    connected: false,
    phoneNumber: '',
    businessName: 'DentCare Pro',
    apiKey: '',
    webhookUrl: ''
  });

  // Estado para nova automação
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    trigger: 'appointment_reminder',
    timing: '24h',
    template: '',
    active: true,
    conditions: []
  });

  // Estado para novo template
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'appointment',
    content: '',
    variables: [],
    active: true
  });

  // Dados de exemplo
  useEffect(() => {
    const sampleConversations = [
      {
        id: 1,
        patientName: 'Maria Silva',
        phoneNumber: '+351912345678',
        lastMessage: 'Obrigada pela confirmação da consulta!',
        lastMessageTime: '2024-08-26T10:30:00',
        status: 'active',
        unreadCount: 0,
        tags: ['paciente_ativo', 'consulta_confirmada'],
        avatar: 'MS'
      },
      {
        id: 2,
        patientName: 'António Santos',
        phoneNumber: '+351925678901',
        lastMessage: 'Posso remarcar para amanhã?',
        lastMessageTime: '2024-08-26T09:15:00',
        status: 'pending',
        unreadCount: 2,
        tags: ['reagendamento', 'urgente'],
        avatar: 'AS'
      },
      {
        id: 3,
        patientName: 'Catarina Oliveira',
        phoneNumber: '+351934567890',
        lastMessage: 'Muito obrigada pelo atendimento!',
        lastMessageTime: '2024-08-25T16:45:00',
        status: 'resolved',
        unreadCount: 0,
        tags: ['satisfeito', 'tratamento_concluido'],
        avatar: 'CO'
      }
    ];

    const sampleAutomations = [
      {
        id: 1,
        name: 'Lembrete de Consulta',
        trigger: 'appointment_reminder',
        timing: '24h',
        template: 'Olá {{nome}}! Lembramos que tem consulta marcada para amanhã às {{hora}} na DentCare Pro. Confirme sua presença respondendo SIM.',
        active: true,
        sentCount: 45,
        responseRate: 78
      },
      {
        id: 2,
        name: 'Confirmação de Agendamento',
        trigger: 'appointment_scheduled',
        timing: 'immediate',
        template: 'Consulta agendada com sucesso! {{nome}}, sua consulta está marcada para {{data}} às {{hora}}. Até breve!',
        active: true,
        sentCount: 23,
        responseRate: 95
      },
      {
        id: 3,
        name: 'Follow-up Pós-Tratamento',
        trigger: 'treatment_completed',
        timing: '48h',
        template: 'Olá {{nome}}! Como está se sentindo após o tratamento? Se tiver alguma dúvida, estamos aqui para ajudar.',
        active: true,
        sentCount: 12,
        responseRate: 65
      }
    ];

    const sampleTemplates = [
      {
        id: 1,
        name: 'Boas-vindas',
        category: 'welcome',
        content: 'Olá! Bem-vindo à DentCare Pro! 🦷\n\nSou a assistente virtual e estou aqui para ajudar com:\n• Agendamentos\n• Informações sobre tratamentos\n• Dúvidas gerais\n\nComo posso ajudar hoje?',
        variables: [],
        active: true,
        usageCount: 156
      },
      {
        id: 2,
        name: 'Agendamento Disponível',
        category: 'appointment',
        content: 'Temos as seguintes opções disponíveis:\n\n📅 {{data1}} às {{hora1}}\n📅 {{data2}} às {{hora2}}\n📅 {{data3}} às {{hora3}}\n\nQual horário prefere?',
        variables: ['data1', 'hora1', 'data2', 'hora2', 'data3', 'hora3'],
        active: true,
        usageCount: 89
      },
      {
        id: 3,
        name: 'Instruções Pós-Tratamento',
        category: 'treatment',
        content: 'Instruções importantes após seu tratamento:\n\n• Evite alimentos duros nas próximas 24h\n• Mantenha boa higiene oral\n• Em caso de dor, tome o medicamento prescrito\n• Retorne em caso de desconforto\n\nCuidamos de você! 💙',
        variables: [],
        active: true,
        usageCount: 34
      }
    ];

    setConversations(sampleConversations);
    setAutomations(sampleAutomations);
    setTemplates(sampleTemplates);
  }, []);

  // Função para formatar data/hora
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`;
    } else {
      return date.toLocaleDateString('pt-PT');
    }
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para conectar WhatsApp
  const handleConnectWhatsApp = () => {
    if (!whatsappConfig.phoneNumber || !whatsappConfig.apiKey) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    setWhatsappConfig({ ...whatsappConfig, connected: true });
    toast.success('WhatsApp conectado com sucesso!');
    setIsConfigModalOpen(false);
  };

  // Função para adicionar automação
  const handleAddAutomation = () => {
    if (!newAutomation.name || !newAutomation.template) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    const automation = {
      ...newAutomation,
      id: automations.length + 1,
      sentCount: 0,
      responseRate: 0
    };

    setAutomations([...automations, automation]);
    setNewAutomation({
      name: '',
      trigger: 'appointment_reminder',
      timing: '24h',
      template: '',
      active: true,
      conditions: []
    });
    setIsAutomationModalOpen(false);
    toast.success('Automação criada com sucesso!');
  };

  // Função para adicionar template
  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    const template = {
      ...newTemplate,
      id: templates.length + 1,
      usageCount: 0
    };

    setTemplates([...templates, template]);
    setNewTemplate({
      name: '',
      category: 'appointment',
      content: '',
      variables: [],
      active: true
    });
    setIsTemplateModalOpen(false);
    toast.success('Template criado com sucesso!');
  };

  // Filtrar conversas
  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phoneNumber.includes(searchTerm) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">IA do WhatsApp</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsConfigModalOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
          <Button onClick={() => setIsTemplateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Template
          </Button>
          <Button onClick={() => setIsAutomationModalOpen(true)}>
            <Bot className="w-4 h-4 mr-2" />
            Nova Automação
          </Button>
        </div>
      </div>

      {/* Status de Conexão */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${whatsappConfig.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <h3 className="font-semibold">Status da Conexão</h3>
                <p className="text-sm text-gray-600">
                  {whatsappConfig.connected 
                    ? `Conectado como ${whatsappConfig.businessName}` 
                    : 'Desconectado - Configure sua conta WhatsApp Business'}
                </p>
              </div>
            </div>
            {!whatsappConfig.connected && (
              <Button onClick={() => setIsConfigModalOpen(true)}>
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
            <div className="text-2xl font-bold">
              {conversations.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-green-600">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
            <Send className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {automations.reduce((total, auto) => total + auto.sentCount, 0)}
            </div>
            <p className="text-xs text-green-600">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(automations.reduce((total, auto) => total + auto.responseRate, 0) / automations.length)}%
            </div>
            <p className="text-xs text-green-600">Média geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automações Ativas</CardTitle>
            <Bot className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {automations.filter(a => a.active).length}
            </div>
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
                {automations.slice(0, 3).map((automation) => (
                  <div key={automation.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{automation.name}</span>
                      <span className="text-sm text-gray-600">{automation.responseRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${automation.responseRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{automation.sentCount} enviadas</span>
                      <span>{Math.round(automation.sentCount * automation.responseRate / 100)} respostas</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          {/* Filtros de Conversa */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Conversas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConversations.map((conversation) => (
              <Card key={conversation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {conversation.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{conversation.patientName}</h3>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conversation.phoneNumber}</p>
                      <p className="text-sm text-gray-800 truncate mb-2">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(conversation.status)} size="sm">
                          {conversation.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDateTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {conversation.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {automations.map((automation) => (
              <Card key={automation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bot className="w-5 h-5 text-purple-600" />
                      {automation.name}
                    </CardTitle>
                    <input 
                      type="checkbox" 
                      checked={automation.active} 
                      className="w-4 h-4 text-blue-600 rounded"
                      readOnly
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Trigger:</span> {automation.trigger.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Timing:</span> {automation.timing}
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {automation.template.substring(0, 100)}...
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Enviadas: {automation.sentCount}</span>
                    <span className="text-green-600">Taxa: {automation.responseRate}%</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      {template.name}
                    </CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                    {template.content}
                  </div>
                  {template.variables.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Variáveis:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map((variable, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Usado {template.usageCount} vezes</span>
                    <input 
                      type="checkbox" 
                      checked={template.active} 
                      className="w-4 h-4 text-blue-600 rounded"
                      readOnly
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Testar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Configuração do WhatsApp */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configuração do WhatsApp Business</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Nome do Negócio</Label>
              <Input
                id="businessName"
                value={whatsappConfig.businessName}
                onChange={(e) => setWhatsappConfig({...whatsappConfig, businessName: e.target.value})}
                placeholder="DentCare Pro"
              />
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Número do WhatsApp *</Label>
              <Input
                id="phoneNumber"
                value={whatsappConfig.phoneNumber}
                onChange={(e) => setWhatsappConfig({...whatsappConfig, phoneNumber: e.target.value})}
                placeholder="+351 912 345 678"
              />
            </div>
            
            <div>
              <Label htmlFor="apiKey">API Key *</Label>
              <Input
                id="apiKey"
                type="password"
                value={whatsappConfig.apiKey}
                onChange={(e) => setWhatsappConfig({...whatsappConfig, apiKey: e.target.value})}
                placeholder="Sua chave da API do WhatsApp Business"
              />
            </div>
            
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={whatsappConfig.webhookUrl}
                onChange={(e) => setWhatsappConfig({...whatsappConfig, webhookUrl: e.target.value})}
                placeholder="https://sua-url-webhook.com"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsConfigModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConnectWhatsApp}>
              Conectar WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Nova Automação */}
      <Dialog open={isAutomationModalOpen} onOpenChange={setIsAutomationModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Automação</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="automationName">Nome da Automação *</Label>
                <Input
                  id="automationName"
                  value={newAutomation.name}
                  onChange={(e) => setNewAutomation({...newAutomation, name: e.target.value})}
                  placeholder="Ex: Lembrete de Consulta"
                />
              </div>
              <div>
                <Label htmlFor="trigger">Trigger</Label>
                <Select 
                  value={newAutomation.trigger} 
                  onValueChange={(value) => setNewAutomation({...newAutomation, trigger: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment_reminder">Lembrete de Consulta</SelectItem>
                    <SelectItem value="appointment_scheduled">Consulta Agendada</SelectItem>
                    <SelectItem value="treatment_completed">Tratamento Concluído</SelectItem>
                    <SelectItem value="payment_due">Pagamento Pendente</SelectItem>
                    <SelectItem value="new_patient">Novo Paciente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="timing">Timing</Label>
              <Select 
                value={newAutomation.timing} 
                onValueChange={(value) => setNewAutomation({...newAutomation, timing: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Imediato</SelectItem>
                  <SelectItem value="1h">1 hora antes</SelectItem>
                  <SelectItem value="24h">24 horas antes</SelectItem>
                  <SelectItem value="48h">48 horas depois</SelectItem>
                  <SelectItem value="1week">1 semana depois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="template">Template da Mensagem *</Label>
              <Textarea
                id="template"
                value={newAutomation.template}
                onChange={(e) => setNewAutomation({...newAutomation, template: e.target.value})}
                placeholder="Olá {{nome}}! Sua consulta está marcada para {{data}} às {{hora}}."
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Use variáveis como: {{nome}}, {{data}}, {{hora}}, {{tratamento}}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={newAutomation.active}
                onChange={(e) => setNewAutomation({...newAutomation, active: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <Label>Ativar automação imediatamente</Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsAutomationModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddAutomation}>
              Criar Automação
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Novo Template */}
      <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="templateName">Nome do Template *</Label>
                <Input
                  id="templateName"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="Ex: Boas-vindas"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={newTemplate.category} 
                  onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Boas-vindas</SelectItem>
                    <SelectItem value="appointment">Agendamento</SelectItem>
                    <SelectItem value="treatment">Tratamento</SelectItem>
                    <SelectItem value="payment">Pagamento</SelectItem>
                    <SelectItem value="general">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="content">Conteúdo da Mensagem *</Label>
              <Textarea
                id="content"
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                placeholder="Digite o conteúdo do template..."
                rows={6}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={newTemplate.active}
                onChange={(e) => setNewTemplate({...newTemplate, active: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <Label>Ativar template</Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsTemplateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddTemplate}>
              Criar Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppIntegration;

