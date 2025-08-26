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
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Calendar, 
  Stethoscope, 
  FileText, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Activity,
  TrendingUp,
  Filter,
  Download,
  MoreVertical,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RefreshCw,
  Target,
  Clipboard,
  Calculator,
  CreditCard,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

const TreatmentManagement = () => {
  const [treatments, setTreatments] = useState([]);
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddTreatmentModalOpen, setIsAddTreatmentModalOpen] = useState(false);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isViewTreatmentModalOpen, setIsViewTreatmentModalOpen] = useState(false);
  const [isViewPlanModalOpen, setIsViewPlanModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tratamentos');

  // Estado para novo tratamento
  const [newTreatment, setNewTreatment] = useState({
    pacienteId: '',
    pacienteNome: '',
    tipoProcedimento: '',
    denteRegiao: '',
    dentistaResponsavel: '',
    dataInicio: '',
    dataFim: '',
    status: 'planejado',
    prioridade: 'media',
    materiaisUtilizados: '',
    valorCobrado: 0,
    valorPago: 0,
    statusPagamento: 'pendente',
    observacoes: '',
    evolucao: []
  });

  // Estado para novo plano de tratamento
  const [newPlan, setNewPlan] = useState({
    pacienteId: '',
    pacienteNome: '',
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFimPrevista: '',
    status: 'ativo',
    valorTotal: 0,
    valorPago: 0,
    procedimentos: [],
    observacoes: ''
  });

  // Dados de exemplo
  useEffect(() => {
    const sampleTreatments = [
      {
        id: 1,
        pacienteId: 1,
        pacienteNome: 'Maria Silva',
        tipoProcedimento: 'Restauração Composta',
        denteRegiao: 'Dente 16',
        dentistaResponsavel: 'Dr. Fernando Pessoa',
        dataInicio: '2024-08-20',
        dataFim: '2024-08-20',
        status: 'concluido',
        prioridade: 'alta',
        materiaisUtilizados: 'Resina composta, ácido fosfórico, adesivo',
        valorCobrado: 120.00,
        valorPago: 120.00,
        statusPagamento: 'pago',
        observacoes: 'Restauração realizada com sucesso. Paciente orientada sobre cuidados.',
        evolucao: [
          {
            id: 1,
            data: '2024-08-20',
            observacao: 'Procedimento realizado sem complicações',
            dentista: 'Dr. Fernando Pessoa'
          }
        ]
      },
      {
        id: 2,
        pacienteId: 2,
        pacienteNome: 'António Santos',
        tipoProcedimento: 'Limpeza Periodontal',
        denteRegiao: 'Geral',
        dentistaResponsavel: 'Dr. Fernando Pessoa',
        dataInicio: '2024-08-25',
        dataFim: null,
        status: 'em_andamento',
        prioridade: 'media',
        materiaisUtilizados: 'Curetas, ultrassom periodontal',
        valorCobrado: 80.00,
        valorPago: 40.00,
        statusPagamento: 'parcial',
        observacoes: 'Primeira sessão realizada. Necessária segunda sessão.',
        evolucao: [
          {
            id: 1,
            data: '2024-08-25',
            observacao: 'Primeira sessão de limpeza realizada. Gengivas muito inflamadas.',
            dentista: 'Dr. Fernando Pessoa'
          }
        ]
      },
      {
        id: 3,
        pacienteId: 3,
        pacienteNome: 'Catarina Oliveira',
        tipoProcedimento: 'Avaliação Inicial',
        denteRegiao: 'Geral',
        dentistaResponsavel: 'Dr. Fernando Pessoa',
        dataInicio: '2024-09-01',
        dataFim: null,
        status: 'planejado',
        prioridade: 'baixa',
        materiaisUtilizados: '',
        valorCobrado: 50.00,
        valorPago: 0.00,
        statusPagamento: 'pendente',
        observacoes: 'Primeira consulta para avaliação geral.',
        evolucao: []
      }
    ];

    const samplePlans = [
      {
        id: 1,
        pacienteId: 1,
        pacienteNome: 'Maria Silva',
        titulo: 'Reabilitação Oral Completa',
        descricao: 'Plano de tratamento para reabilitação completa da arcada superior',
        dataInicio: '2024-08-15',
        dataFimPrevista: '2024-12-15',
        status: 'ativo',
        valorTotal: 2500.00,
        valorPago: 500.00,
        procedimentos: [
          {
            id: 1,
            nome: 'Limpeza e Profilaxia',
            status: 'concluido',
            valor: 50.00,
            data: '2024-08-15'
          },
          {
            id: 2,
            nome: 'Restauração Composta - Dente 16',
            status: 'concluido',
            valor: 120.00,
            data: '2024-08-20'
          },
          {
            id: 3,
            nome: 'Tratamento de Canal - Dente 14',
            status: 'planejado',
            valor: 300.00,
            data: '2024-09-10'
          },
          {
            id: 4,
            nome: 'Coroa Cerâmica - Dente 14',
            status: 'planejado',
            valor: 400.00,
            data: '2024-10-15'
          }
        ],
        observacoes: 'Paciente colaborativa. Boa higiene oral.'
      },
      {
        id: 2,
        pacienteId: 2,
        pacienteNome: 'António Santos',
        titulo: 'Tratamento Periodontal',
        descricao: 'Tratamento completo para gengivite e periodontite',
        dataInicio: '2024-08-10',
        dataFimPrevista: '2024-11-10',
        status: 'ativo',
        valorTotal: 800.00,
        valorPago: 200.00,
        procedimentos: [
          {
            id: 1,
            nome: 'Avaliação Periodontal',
            status: 'concluido',
            valor: 70.00,
            data: '2024-08-10'
          },
          {
            id: 2,
            nome: 'Limpeza Periodontal - 1ª Sessão',
            status: 'em_andamento',
            valor: 80.00,
            data: '2024-08-25'
          },
          {
            id: 3,
            nome: 'Limpeza Periodontal - 2ª Sessão',
            status: 'planejado',
            valor: 80.00,
            data: '2024-09-15'
          }
        ],
        observacoes: 'Paciente fumador. Necessário acompanhamento rigoroso.'
      }
    ];

    setTreatments(sampleTreatments);
    setTreatmentPlans(samplePlans);
  }, []);

  // Funções de filtro e pesquisa
  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.tipoProcedimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.denteRegiao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'todos' || treatment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const filteredPlans = treatmentPlans.filter(plan => {
    const matchesSearch = plan.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'todos' || plan.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'planejado': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'pausado': return 'bg-gray-100 text-gray-800';
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter cor da prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter ícone do status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'planejado': return <Clock className="w-4 h-4" />;
      case 'em_andamento': return <PlayCircle className="w-4 h-4" />;
      case 'concluido': return <CheckCircle className="w-4 h-4" />;
      case 'cancelado': return <XCircle className="w-4 h-4" />;
      case 'pausado': return <PauseCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  // Função para calcular progresso do plano
  const calculatePlanProgress = (plan) => {
    const total = plan.procedimentos.length;
    const completed = plan.procedimentos.filter(p => p.status === 'concluido').length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Função para adicionar novo tratamento
  const handleAddTreatment = () => {
    if (!newTreatment.pacienteNome || !newTreatment.tipoProcedimento) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    const treatment = {
      ...newTreatment,
      id: treatments.length + 1,
      evolucao: []
    };

    setTreatments([...treatments, treatment]);
    setNewTreatment({
      pacienteId: '',
      pacienteNome: '',
      tipoProcedimento: '',
      denteRegiao: '',
      dentistaResponsavel: '',
      dataInicio: '',
      dataFim: '',
      status: 'planejado',
      prioridade: 'media',
      materiaisUtilizados: '',
      valorCobrado: 0,
      valorPago: 0,
      statusPagamento: 'pendente',
      observacoes: '',
      evolucao: []
    });
    setIsAddTreatmentModalOpen(false);
    toast.success('Tratamento adicionado com sucesso!');
  };

  // Função para adicionar novo plano
  const handleAddPlan = () => {
    if (!newPlan.pacienteNome || !newPlan.titulo) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    const plan = {
      ...newPlan,
      id: treatmentPlans.length + 1,
      procedimentos: []
    };

    setTreatmentPlans([...treatmentPlans, plan]);
    setNewPlan({
      pacienteId: '',
      pacienteNome: '',
      titulo: '',
      descricao: '',
      dataInicio: '',
      dataFimPrevista: '',
      status: 'ativo',
      valorTotal: 0,
      valorPago: 0,
      procedimentos: [],
      observacoes: ''
    });
    setIsAddPlanModalOpen(false);
    toast.success('Plano de tratamento criado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Tratamentos</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </Button>
          <Button onClick={() => setIsAddTreatmentModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Tratamento
          </Button>
          <Button onClick={() => setIsAddPlanModalOpen(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Novo Plano
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamentos Ativos</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatments.filter(t => t.status === 'em_andamento').length}
            </div>
            <p className="text-xs text-green-600">Em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatments.filter(t => t.status === 'concluido').length}
            </div>
            <p className="text-xs text-green-600">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{treatments.reduce((total, t) => total + t.valorPago, 0).toFixed(2)}
            </div>
            <p className="text-xs text-green-600">Valor recebido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {treatmentPlans.filter(p => p.status === 'ativo').length}
            </div>
            <p className="text-xs text-green-600">Em execução</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Pesquisar por paciente, procedimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="planejado">Planejados</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluídos</SelectItem>
                  <SelectItem value="ativo">Planos Ativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para Tratamentos e Planos */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tratamentos">Tratamentos Individuais</TabsTrigger>
          <TabsTrigger value="planos">Planos de Tratamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tratamentos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTreatments.map((treatment) => (
              <Card key={treatment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      {treatment.tipoProcedimento}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Badge className={getStatusColor(treatment.status)}>
                        {getStatusIcon(treatment.status)}
                        <span className="ml-1">{treatment.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    {treatment.pacienteNome}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Activity className="w-4 h-4" />
                    {treatment.denteRegiao}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(treatment.dataInicio)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    €{treatment.valorCobrado.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(treatment.prioridade)}>
                      {treatment.prioridade}
                    </Badge>
                    <Badge variant="outline">
                      {treatment.statusPagamento}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedTreatment(treatment);
                        setIsViewTreatmentModalOpen(true);
                      }}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="planos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      {plan.titulo}
                    </CardTitle>
                    <Badge className={getStatusColor(plan.status)}>
                      {plan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    {plan.pacienteNome}
                  </div>
                  <div className="text-sm text-gray-600">
                    {plan.descricao}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(plan.dataInicio)} - {formatDate(plan.dataFimPrevista)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    €{plan.valorPago.toFixed(2)} / €{plan.valorTotal.toFixed(2)}
                  </div>
                  
                  {/* Barra de Progresso */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{calculatePlanProgress(plan)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${calculatePlanProgress(plan)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Procedimentos:</span> {plan.procedimentos.length}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsViewPlanModalOpen(true);
                      }}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para Adicionar Tratamento */}
      <Dialog open={isAddTreatmentModalOpen} onOpenChange={setIsAddTreatmentModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Tratamento</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pacienteNome">Paciente *</Label>
                <Input
                  id="pacienteNome"
                  value={newTreatment.pacienteNome}
                  onChange={(e) => setNewTreatment({...newTreatment, pacienteNome: e.target.value})}
                  placeholder="Nome do paciente"
                />
              </div>
              <div>
                <Label htmlFor="tipoProcedimento">Tipo de Procedimento *</Label>
                <Select 
                  value={newTreatment.tipoProcedimento} 
                  onValueChange={(value) => setNewTreatment({...newTreatment, tipoProcedimento: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Limpeza e Profilaxia">Limpeza e Profilaxia</SelectItem>
                    <SelectItem value="Restauração Composta">Restauração Composta</SelectItem>
                    <SelectItem value="Tratamento de Canal">Tratamento de Canal</SelectItem>
                    <SelectItem value="Extração">Extração</SelectItem>
                    <SelectItem value="Implante">Implante</SelectItem>
                    <SelectItem value="Coroa">Coroa</SelectItem>
                    <SelectItem value="Ponte">Ponte</SelectItem>
                    <SelectItem value="Prótese">Prótese</SelectItem>
                    <SelectItem value="Ortodontia">Ortodontia</SelectItem>
                    <SelectItem value="Periodontia">Periodontia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="denteRegiao">Dente/Região</Label>
                <Input
                  id="denteRegiao"
                  value={newTreatment.denteRegiao}
                  onChange={(e) => setNewTreatment({...newTreatment, denteRegiao: e.target.value})}
                  placeholder="Ex: Dente 16, Arcada Superior"
                />
              </div>
              <div>
                <Label htmlFor="dentistaResponsavel">Dentista Responsável</Label>
                <Input
                  id="dentistaResponsavel"
                  value={newTreatment.dentistaResponsavel}
                  onChange={(e) => setNewTreatment({...newTreatment, dentistaResponsavel: e.target.value})}
                  placeholder="Nome do dentista"
                />
              </div>
              <div>
                <Label htmlFor="dataInicio">Data de Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={newTreatment.dataInicio}
                  onChange={(e) => setNewTreatment({...newTreatment, dataInicio: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select 
                  value={newTreatment.prioridade} 
                  onValueChange={(value) => setNewTreatment({...newTreatment, prioridade: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="valorCobrado">Valor Cobrado (€)</Label>
                <Input
                  id="valorCobrado"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newTreatment.valorCobrado}
                  onChange={(e) => setNewTreatment({...newTreatment, valorCobrado: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newTreatment.status} 
                  onValueChange={(value) => setNewTreatment({...newTreatment, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planejado">Planejado</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="materiaisUtilizados">Materiais Utilizados</Label>
              <Textarea
                id="materiaisUtilizados"
                value={newTreatment.materiaisUtilizados}
                onChange={(e) => setNewTreatment({...newTreatment, materiaisUtilizados: e.target.value})}
                placeholder="Liste os materiais utilizados"
              />
            </div>
            
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={newTreatment.observacoes}
                onChange={(e) => setNewTreatment({...newTreatment, observacoes: e.target.value})}
                placeholder="Observações sobre o tratamento"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsAddTreatmentModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddTreatment}>
              Adicionar Tratamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Visualizar Tratamento */}
      {selectedTreatment && (
        <Dialog open={isViewTreatmentModalOpen} onOpenChange={setIsViewTreatmentModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {selectedTreatment.tipoProcedimento}
                <Badge className={getStatusColor(selectedTreatment.status)}>
                  {selectedTreatment.status.replace('_', ' ')}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Informações do Paciente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Nome:</span> {selectedTreatment.pacienteNome}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Dente/Região:</span> {selectedTreatment.denteRegiao}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Dentista:</span> {selectedTreatment.dentistaResponsavel}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Cronograma</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Início:</span> {formatDate(selectedTreatment.dataInicio)}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Fim:</span> {formatDate(selectedTreatment.dataFim)}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Prioridade:</span>
                      <Badge className={getPriorityColor(selectedTreatment.prioridade)} size="sm">
                        {selectedTreatment.prioridade}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Financeiro</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Valor:</span> €{selectedTreatment.valorCobrado.toFixed(2)}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Pago:</span> €{selectedTreatment.valorPago.toFixed(2)}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Status:</span>
                      <Badge variant="outline" size="sm">
                        {selectedTreatment.statusPagamento}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {selectedTreatment.materiaisUtilizados && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Materiais Utilizados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{selectedTreatment.materiaisUtilizados}</p>
                  </CardContent>
                </Card>
              )}
              
              {selectedTreatment.observacoes && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{selectedTreatment.observacoes}</p>
                  </CardContent>
                </Card>
              )}
              
              {selectedTreatment.evolucao.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Evolução do Tratamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedTreatment.evolucao.map((evolucao) => (
                        <div key={evolucao.id} className="border-l-2 border-blue-200 pl-4">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="w-4 h-4" />
                            {formatDate(evolucao.data)}
                            <span className="text-gray-500">- {evolucao.dentista}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{evolucao.observacao}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Mensagem quando não há tratamentos */}
      {filteredTreatments.length === 0 && activeTab === 'tratamentos' && (
        <Card>
          <CardContent className="p-8 text-center">
            <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'todos' 
                ? 'Nenhum tratamento encontrado com os critérios selecionados.' 
                : 'Nenhum tratamento cadastrado ainda.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há planos */}
      {filteredPlans.length === 0 && activeTab === 'planos' && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'todos' 
                ? 'Nenhum plano encontrado com os critérios selecionados.' 
                : 'Nenhum plano de tratamento criado ainda.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TreatmentManagement;

