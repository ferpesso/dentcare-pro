import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  FileText, 
  Upload, 
  Download, 
  Trash2,
  Heart,
  AlertTriangle,
  Pill,
  Stethoscope,
  MapPin,
  CreditCard,
  Clock,
  Activity,
  User,
  UserPlus,
  Filter,
  MoreVertical,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const PatientManagementComplete = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dados-pessoais');

  // Estado para novo paciente
  const [newPatient, setNewPatient] = useState({
    nome: '',
    nif: '',
    niss: '',
    dataNascimento: '',
    telefone: '',
    telemovel: '',
    email: '',
    morada: '',
    codigoPostal: '',
    cidade: '',
    profissao: '',
    estadoCivil: '',
    contactoEmergencia: {
      nome: '',
      telefone: '',
      parentesco: ''
    },
    anamnese: {
      queixaPrincipal: '',
      historicoMedico: '',
      medicamentosUso: '',
      alergias: '',
      doencasPreexistentes: '',
      historicoOdontologico: '',
      habitos: '',
      observacoes: ''
    },
    dadosFinanceiros: {
      seguroSaude: '',
      numeroSeguro: '',
      subsistema: '',
      comparticipacao: 0
    },
    status: 'ativo',
    observacoes: ''
  });

  // Dados de exemplo expandidos
  useEffect(() => {
    const samplePatients = [
      {
        id: 1,
        nome: 'Maria Silva',
        nif: '123456789',
        niss: '11111111111',
        dataNascimento: '1985-03-15',
        telefone: '+351 912 345 678',
        telemovel: '+351 912 345 678',
        email: 'maria.silva@email.com',
        morada: 'Rua das Flores, 123',
        codigoPostal: '1000-001',
        cidade: 'Lisboa',
        profissao: 'Professora',
        estadoCivil: 'Casada',
        contactoEmergencia: {
          nome: 'João Silva',
          telefone: '+351 913 456 789',
          parentesco: 'Cônjuge'
        },
        anamnese: {
          queixaPrincipal: 'Dor no dente 36',
          historicoMedico: 'Hipertensão controlada com medicação',
          medicamentosUso: 'Losartana 50mg',
          alergias: 'Penicilina',
          doencasPreexistentes: 'Hipertensão',
          historicoOdontologico: 'Extração do siso há 5 anos',
          habitos: 'Não fuma, não bebe',
          observacoes: 'Paciente colaborativa'
        },
        dadosFinanceiros: {
          seguroSaude: 'ADSE',
          numeroSeguro: 'ADSE123456',
          subsistema: 'ADSE',
          comparticipacao: 70
        },
        status: 'ativo',
        ultimaConsulta: '2024-08-15',
        proximaConsulta: '2024-09-15',
        historicoTratamentos: [
          {
            id: 1,
            data: '2024-08-15',
            tipoProcedimento: 'Limpeza e Profilaxia',
            denteRegiao: 'Geral',
            dentistaResponsavel: 'Dr. Fernando Pessoa',
            materiaisUtilizados: 'Pasta profilática, flúor',
            valorCobrado: 50.00,
            valorPago: 50.00,
            statusPagamento: 'Pago',
            observacoes: 'Remoção de tártaro leve',
            evolucao: [
              {
                data: '2024-08-15',
                observacao: 'Paciente apresentou melhora significativa'
              }
            ]
          }
        ],
        documentos: [
          {
            id: 1,
            nome: 'Radiografia Panorâmica',
            tipo: 'Radiografia',
            categoria: 'Exame',
            dataUpload: '2024-08-15',
            url: '#'
          }
        ],
        observacoes: 'Paciente regular, sem complicações'
      },
      {
        id: 2,
        nome: 'António Santos',
        nif: '987654321',
        niss: '22222222222',
        dataNascimento: '1978-11-22',
        telefone: '+351 925 678 901',
        telemovel: '+351 925 678 901',
        email: 'antonio.santos@email.com',
        morada: 'Avenida da República, 456',
        codigoPostal: '4000-001',
        cidade: 'Porto',
        profissao: 'Engenheiro',
        estadoCivil: 'Solteiro',
        contactoEmergencia: {
          nome: 'Ana Santos',
          telefone: '+351 926 789 012',
          parentesco: 'Filha'
        },
        anamnese: {
          queixaPrincipal: 'Sangramento na gengiva',
          historicoMedico: 'Sem antecedentes relevantes',
          medicamentosUso: 'Aspirina 100mg',
          alergias: 'Nenhuma conhecida',
          doencasPreexistentes: 'Gengivite',
          historicoOdontologico: 'Tratamento periodontal anterior',
          habitos: 'Fuma ocasionalmente',
          observacoes: 'Necessita acompanhamento periodontal'
        },
        dadosFinanceiros: {
          seguroSaude: 'Particular',
          numeroSeguro: '',
          subsistema: '',
          comparticipacao: 0
        },
        status: 'ativo',
        ultimaConsulta: '2024-08-10',
        proximaConsulta: '2024-09-10',
        historicoTratamentos: [
          {
            id: 1,
            data: '2024-08-10',
            tipoProcedimento: 'Avaliação Periodontal',
            denteRegiao: 'Geral',
            dentistaResponsavel: 'Dr. Fernando Pessoa',
            materiaisUtilizados: 'Sonda periodontal',
            valorCobrado: 70.00,
            valorPago: 70.00,
            statusPagamento: 'Pago',
            observacoes: 'Gengivas inflamadas',
            evolucao: []
          }
        ],
        documentos: [],
        observacoes: 'Histórico de problemas gengivais'
      },
      {
        id: 3,
        nome: 'Catarina Oliveira',
        nif: '456789123',
        niss: '33333333333',
        dataNascimento: '1992-07-08',
        telefone: '+351 934 567 890',
        telemovel: '+351 934 567 890',
        email: 'catarina.oliveira@email.com',
        morada: 'Rua do Comércio, 789',
        codigoPostal: '3000-001',
        cidade: 'Coimbra',
        profissao: 'Médica',
        estadoCivil: 'Solteira',
        contactoEmergencia: {
          nome: 'Pedro Oliveira',
          telefone: '+351 935 678 901',
          parentesco: 'Irmão'
        },
        anamnese: {
          queixaPrincipal: 'Avaliação geral',
          historicoMedico: 'Sem antecedentes',
          medicamentosUso: 'Contraceptivo oral',
          alergias: 'Látex',
          doencasPreexistentes: 'Nenhuma',
          historicoOdontologico: 'Primeira consulta',
          habitos: 'Não fuma, não bebe',
          observacoes: 'Paciente nova'
        },
        dadosFinanceiros: {
          seguroSaude: 'SNS',
          numeroSeguro: 'SNS123456',
          subsistema: 'SNS',
          comparticipacao: 100
        },
        status: 'novo',
        ultimaConsulta: null,
        proximaConsulta: '2024-09-01',
        historicoTratamentos: [],
        documentos: [],
        observacoes: 'Primeira consulta marcada'
      }
    ];
    setPatients(samplePatients);
  }, []);

  // Funções de filtro e pesquisa
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.nif.includes(searchTerm) ||
                         patient.telefone.includes(searchTerm) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'todos' || patient.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Função para adicionar novo paciente
  const handleAddPatient = () => {
    if (!newPatient.nome || !newPatient.nif || !newPatient.telefone) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    const patient = {
      ...newPatient,
      id: patients.length + 1,
      ultimaConsulta: null,
      proximaConsulta: null,
      historicoTratamentos: [],
      documentos: []
    };

    setPatients([...patients, patient]);
    setNewPatient({
      nome: '',
      nif: '',
      niss: '',
      dataNascimento: '',
      telefone: '',
      telemovel: '',
      email: '',
      morada: '',
      codigoPostal: '',
      cidade: '',
      profissao: '',
      estadoCivil: '',
      contactoEmergencia: {
        nome: '',
        telefone: '',
        parentesco: ''
      },
      anamnese: {
        queixaPrincipal: '',
        historicoMedico: '',
        medicamentosUso: '',
        alergias: '',
        doencasPreexistentes: '',
        historicoOdontologico: '',
        habitos: '',
        observacoes: ''
      },
      dadosFinanceiros: {
        seguroSaude: '',
        numeroSeguro: '',
        subsistema: '',
        comparticipacao: 0
      },
      status: 'ativo',
      observacoes: ''
    });
    setIsAddModalOpen(false);
    toast.success('Paciente adicionado com sucesso!');
  };

  // Função para visualizar paciente
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  // Função para calcular idade
  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} anos`;
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      case 'novo': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pacientes</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Pesquisar por nome, NIF, telefone ou email..."
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
                  <SelectItem value="ativo">Ativos</SelectItem>
                  <SelectItem value="inativo">Inativos</SelectItem>
                  <SelectItem value="novo">Novos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  {patient.nome}
                </CardTitle>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {patient.telefone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {patient.email || 'N/A'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Idade: {calculateAge(patient.dataNascimento)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                Última: {formatDate(patient.ultimaConsulta)}
              </div>
              {patient.anamnese.alergias && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  Alergias: {patient.anamnese.alergias}
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewPatient(patient)}
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

      {/* Mensagem quando não há pacientes */}
      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'todos' 
                ? 'Nenhum paciente encontrado com os critérios selecionados.' 
                : 'Nenhum paciente cadastrado ainda.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal para Adicionar Paciente */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Paciente</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dados-pessoais" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={newPatient.nome}
                    onChange={(e) => setNewPatient({...newPatient, nome: e.target.value})}
                    placeholder="Nome completo do paciente"
                  />
                </div>
                <div>
                  <Label htmlFor="nif">NIF *</Label>
                  <Input
                    id="nif"
                    value={newPatient.nif}
                    onChange={(e) => setNewPatient({...newPatient, nif: e.target.value})}
                    placeholder="Número de Identificação Fiscal"
                  />
                </div>
                <div>
                  <Label htmlFor="niss">NISS</Label>
                  <Input
                    id="niss"
                    value={newPatient.niss}
                    onChange={(e) => setNewPatient({...newPatient, niss: e.target.value})}
                    placeholder="Número de Identificação da Segurança Social"
                  />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={newPatient.dataNascimento}
                    onChange={(e) => setNewPatient({...newPatient, dataNascimento: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={newPatient.telefone}
                    onChange={(e) => setNewPatient({...newPatient, telefone: e.target.value})}
                    placeholder="+351 912 345 678"
                  />
                </div>
                <div>
                  <Label htmlFor="telemovel">Telemóvel</Label>
                  <Input
                    id="telemovel"
                    value={newPatient.telemovel}
                    onChange={(e) => setNewPatient({...newPatient, telemovel: e.target.value})}
                    placeholder="+351 912 345 678"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="profissao">Profissão</Label>
                  <Input
                    id="profissao"
                    value={newPatient.profissao}
                    onChange={(e) => setNewPatient({...newPatient, profissao: e.target.value})}
                    placeholder="Profissão do paciente"
                  />
                </div>
                <div>
                  <Label htmlFor="morada">Morada</Label>
                  <Input
                    id="morada"
                    value={newPatient.morada}
                    onChange={(e) => setNewPatient({...newPatient, morada: e.target.value})}
                    placeholder="Rua, número"
                  />
                </div>
                <div>
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    value={newPatient.codigoPostal}
                    onChange={(e) => setNewPatient({...newPatient, codigoPostal: e.target.value})}
                    placeholder="0000-000"
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={newPatient.cidade}
                    onChange={(e) => setNewPatient({...newPatient, cidade: e.target.value})}
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <Label htmlFor="estadoCivil">Estado Civil</Label>
                  <Select value={newPatient.estadoCivil} onValueChange={(value) => setNewPatient({...newPatient, estadoCivil: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contacto de Emergência</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="emergenciaNome">Nome</Label>
                    <Input
                      id="emergenciaNome"
                      value={newPatient.contactoEmergencia.nome}
                      onChange={(e) => setNewPatient({
                        ...newPatient, 
                        contactoEmergencia: {...newPatient.contactoEmergencia, nome: e.target.value}
                      })}
                      placeholder="Nome do contacto"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergenciaTelefone">Telefone</Label>
                    <Input
                      id="emergenciaTelefone"
                      value={newPatient.contactoEmergencia.telefone}
                      onChange={(e) => setNewPatient({
                        ...newPatient, 
                        contactoEmergencia: {...newPatient.contactoEmergencia, telefone: e.target.value}
                      })}
                      placeholder="+351 912 345 678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergenciaParentesco">Parentesco</Label>
                    <Input
                      id="emergenciaParentesco"
                      value={newPatient.contactoEmergencia.parentesco}
                      onChange={(e) => setNewPatient({
                        ...newPatient, 
                        contactoEmergencia: {...newPatient.contactoEmergencia, parentesco: e.target.value}
                      })}
                      placeholder="Cônjuge, filho, etc."
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="anamnese" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="queixaPrincipal">Queixa Principal</Label>
                  <Textarea
                    id="queixaPrincipal"
                    value={newPatient.anamnese.queixaPrincipal}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, queixaPrincipal: e.target.value}
                    })}
                    placeholder="Descreva a queixa principal do paciente"
                  />
                </div>
                <div>
                  <Label htmlFor="historicoMedico">Histórico Médico</Label>
                  <Textarea
                    id="historicoMedico"
                    value={newPatient.anamnese.historicoMedico}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, historicoMedico: e.target.value}
                    })}
                    placeholder="Histórico médico relevante"
                  />
                </div>
                <div>
                  <Label htmlFor="medicamentosUso">Medicamentos em Uso</Label>
                  <Textarea
                    id="medicamentosUso"
                    value={newPatient.anamnese.medicamentosUso}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, medicamentosUso: e.target.value}
                    })}
                    placeholder="Liste os medicamentos que o paciente está tomando"
                  />
                </div>
                <div>
                  <Label htmlFor="alergias">Alergias</Label>
                  <Textarea
                    id="alergias"
                    value={newPatient.anamnese.alergias}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, alergias: e.target.value}
                    })}
                    placeholder="Alergias conhecidas"
                  />
                </div>
                <div>
                  <Label htmlFor="doencasPreexistentes">Doenças Preexistentes</Label>
                  <Textarea
                    id="doencasPreexistentes"
                    value={newPatient.anamnese.doencasPreexistentes}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, doencasPreexistentes: e.target.value}
                    })}
                    placeholder="Doenças preexistentes"
                  />
                </div>
                <div>
                  <Label htmlFor="historicoOdontologico">Histórico Odontológico</Label>
                  <Textarea
                    id="historicoOdontologico"
                    value={newPatient.anamnese.historicoOdontologico}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, historicoOdontologico: e.target.value}
                    })}
                    placeholder="Histórico de tratamentos odontológicos anteriores"
                  />
                </div>
                <div>
                  <Label htmlFor="habitos">Hábitos</Label>
                  <Textarea
                    id="habitos"
                    value={newPatient.anamnese.habitos}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      anamnese: {...newPatient.anamnese, habitos: e.target.value}
                    })}
                    placeholder="Hábitos relevantes (fumar, beber, etc.)"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financeiro" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seguroSaude">Seguro de Saúde</Label>
                  <Select 
                    value={newPatient.dadosFinanceiros.seguroSaude} 
                    onValueChange={(value) => setNewPatient({
                      ...newPatient, 
                      dadosFinanceiros: {...newPatient.dadosFinanceiros, seguroSaude: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SNS">SNS</SelectItem>
                      <SelectItem value="ADSE">ADSE</SelectItem>
                      <SelectItem value="Particular">Particular</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numeroSeguro">Número do Seguro</Label>
                  <Input
                    id="numeroSeguro"
                    value={newPatient.dadosFinanceiros.numeroSeguro}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      dadosFinanceiros: {...newPatient.dadosFinanceiros, numeroSeguro: e.target.value}
                    })}
                    placeholder="Número do seguro"
                  />
                </div>
                <div>
                  <Label htmlFor="subsistema">Subsistema</Label>
                  <Input
                    id="subsistema"
                    value={newPatient.dadosFinanceiros.subsistema}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      dadosFinanceiros: {...newPatient.dadosFinanceiros, subsistema: e.target.value}
                    })}
                    placeholder="Subsistema de saúde"
                  />
                </div>
                <div>
                  <Label htmlFor="comparticipacao">Comparticipação (%)</Label>
                  <Input
                    id="comparticipacao"
                    type="number"
                    min="0"
                    max="100"
                    value={newPatient.dadosFinanceiros.comparticipacao}
                    onChange={(e) => setNewPatient({
                      ...newPatient, 
                      dadosFinanceiros: {...newPatient.dadosFinanceiros, comparticipacao: parseInt(e.target.value) || 0}
                    })}
                    placeholder="0"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="observacoes" className="space-y-4">
              <div>
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={newPatient.observacoes}
                  onChange={(e) => setNewPatient({...newPatient, observacoes: e.target.value})}
                  placeholder="Observações gerais sobre o paciente"
                  rows={6}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPatient}>
              Adicionar Paciente
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Visualizar Paciente */}
      {selectedPatient && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {selectedPatient.nome}
                <Badge className={getStatusColor(selectedPatient.status)}>
                  {selectedPatient.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="resumo" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                <TabsTrigger value="dados">Dados</TabsTrigger>
                <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
                <TabsTrigger value="tratamentos">Tratamentos</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="resumo" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Informações Básicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Idade:</span> {calculateAge(selectedPatient.dataNascimento)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Telefone:</span> {selectedPatient.telefone}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Email:</span> {selectedPatient.email || 'N/A'}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Profissão:</span> {selectedPatient.profissao || 'N/A'}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Consultas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Última:</span> {formatDate(selectedPatient.ultimaConsulta)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Próxima:</span> {formatDate(selectedPatient.proximaConsulta)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Total de Tratamentos:</span> {selectedPatient.historicoTratamentos.length}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Alertas Médicos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedPatient.anamnese.alergias && (
                        <div className="text-sm text-red-600">
                          <span className="font-medium">Alergias:</span> {selectedPatient.anamnese.alergias}
                        </div>
                      )}
                      {selectedPatient.anamnese.medicamentosUso && (
                        <div className="text-sm">
                          <span className="font-medium">Medicamentos:</span> {selectedPatient.anamnese.medicamentosUso}
                        </div>
                      )}
                      {selectedPatient.anamnese.doencasPreexistentes && (
                        <div className="text-sm">
                          <span className="font-medium">Doenças:</span> {selectedPatient.anamnese.doencasPreexistentes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {selectedPatient.observacoes && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Observações</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{selectedPatient.observacoes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="dados" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.nome}</p>
                  </div>
                  <div>
                    <Label>NIF</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.nif}</p>
                  </div>
                  <div>
                    <Label>NISS</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.niss || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Data de Nascimento</Label>
                    <p className="text-sm text-gray-600">{formatDate(selectedPatient.dataNascimento)}</p>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.telefone}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.email || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Morada</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.morada || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Código Postal</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.codigoPostal || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Cidade</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.cidade || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Profissão</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.profissao || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Estado Civil</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.estadoCivil || 'N/A'}</p>
                  </div>
                </div>
                
                {selectedPatient.contactoEmergencia && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Contacto de Emergência</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Nome</Label>
                        <p className="text-sm text-gray-600">{selectedPatient.contactoEmergencia.nome || 'N/A'}</p>
                      </div>
                      <div>
                        <Label>Telefone</Label>
                        <p className="text-sm text-gray-600">{selectedPatient.contactoEmergencia.telefone || 'N/A'}</p>
                      </div>
                      <div>
                        <Label>Parentesco</Label>
                        <p className="text-sm text-gray-600">{selectedPatient.contactoEmergencia.parentesco || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="anamnese" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Queixa Principal</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.queixaPrincipal || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Histórico Médico</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.historicoMedico || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Medicamentos em Uso</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.medicamentosUso || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Alergias</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.alergias || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Doenças Preexistentes</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.doencasPreexistentes || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Histórico Odontológico</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.historicoOdontologico || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Hábitos</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.anamnese.habitos || 'N/A'}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tratamentos" className="space-y-4">
                {selectedPatient.historicoTratamentos.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPatient.historicoTratamentos.map((tratamento) => (
                      <Card key={tratamento.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center justify-between">
                            <span>{tratamento.tipoProcedimento}</span>
                            <Badge variant="outline">{formatDate(tratamento.data)}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Dente/Região:</span> {tratamento.denteRegiao}
                            </div>
                            <div>
                              <span className="font-medium">Dentista:</span> {tratamento.dentistaResponsavel}
                            </div>
                            <div>
                              <span className="font-medium">Valor:</span> €{tratamento.valorCobrado.toFixed(2)}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {tratamento.statusPagamento}
                            </div>
                          </div>
                          {tratamento.observacoes && (
                            <div>
                              <span className="font-medium text-sm">Observações:</span>
                              <p className="text-sm text-gray-600">{tratamento.observacoes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nenhum tratamento registrado ainda.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="documentos" className="space-y-4">
                {selectedPatient.documentos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedPatient.documentos.map((doc) => (
                      <Card key={doc.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {doc.nome}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Tipo:</span> {doc.tipo}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Data:</span> {formatDate(doc.dataUpload)}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Baixar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nenhum documento anexado ainda.</p>
                      <Button className="mt-4">
                        <Upload className="w-4 h-4 mr-2" />
                        Adicionar Documento
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="financeiro" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Seguro de Saúde</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.dadosFinanceiros?.seguroSaude || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Número do Seguro</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.dadosFinanceiros?.numeroSeguro || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Subsistema</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.dadosFinanceiros?.subsistema || 'N/A'}</p>
                  </div>
                  <div>
                    <Label>Comparticipação</Label>
                    <p className="text-sm text-gray-600">{selectedPatient.dadosFinanceiros?.comparticipacao || 0}%</p>
                  </div>
                </div>
                
                {/* Resumo Financeiro */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Resumo Financeiro</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Cobrado:</span>
                        <p className="text-lg font-bold text-green-600">
                          €{selectedPatient.historicoTratamentos.reduce((total, t) => total + t.valorCobrado, 0).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Total Pago:</span>
                        <p className="text-lg font-bold text-blue-600">
                          €{selectedPatient.historicoTratamentos.reduce((total, t) => total + t.valorPago, 0).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Pendente:</span>
                        <p className="text-lg font-bold text-red-600">
                          €{selectedPatient.historicoTratamentos.reduce((total, t) => total + (t.valorCobrado - t.valorPago), 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PatientManagementComplete;

