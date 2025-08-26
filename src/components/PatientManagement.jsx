import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  X,
  UserCheck,
  Activity,
  FolderOpen
} from 'lucide-react';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Dados de exemplo para demonstração
  useEffect(() => {
    const samplePatients = [
      {
        id: 1,
        nome: 'Maria Silva',
        nif: '123456789',
        niss: '11111111111',
        dataNascimento: '1985-03-15',
        telefone: '+351 912 345 678',
        email: 'maria.silva@email.com',
        morada: 'Rua das Flores, 123, Lisboa',
        codigoPostal: '1000-001',
        contactoEmergencia: 'João Silva - +351 913 456 789',
        alergias: 'Penicilina',
        medicamentos: 'Nenhum',
        observacoes: 'Paciente regular, sem complicações',
        ultimaConsulta: '2024-08-15',
        anamnese: {
          queixaPrincipal: 'Dor no dente 36',
          historicoMedico: 'Hipertensão, controlada com medicação.',
          medicamentosUso: 'Losartana 50mg',
          alergias: 'Penicilina',
          doencasPreexistentes: 'Nenhuma',
          historicoOdontologico: 'Extração do siso há 5 anos.',
          habitos: 'Não fuma, não bebe.',
          contatoEmergenciaNome: 'João Silva',
          contatoEmergenciaTelefone: '+351 913 456 789',
          contatoEmergenciaParentesco: 'Cônjuge'
        },
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
            observacoes: 'Remoção de tártaro leve.',
            evolucao: []
          }
        ],
        documentos: []
      },
      {
        id: 2,
        nome: 'António Santos',
        nif: '987654321',
        niss: '22222222222',
        dataNascimento: '1978-11-22',
        telefone: '+351 925 678 901',
        email: 'antonio.santos@email.com',
        morada: 'Avenida da República, 456, Porto',
        codigoPostal: '4000-001',
        contactoEmergencia: 'Ana Santos - +351 926 789 012',
        alergias: 'Nenhuma conhecida',
        medicamentos: 'Aspirina 100mg',
        observacoes: 'Histórico de problemas gengivais',
        ultimaConsulta: '2024-08-10',
        anamnese: {
          queixaPrincipal: 'Sangramento na gengiva',
          historicoMedico: 'Nenhum.',
          medicamentosUso: 'Aspirina 100mg',
          alergias: 'Nenhuma conhecida',
          doencasPreexistentes: 'Gengivite',
          habitos: 'Fuma ocasionalmente.',
          contatoEmergenciaNome: 'Ana Santos',
          contatoEmergenciaTelefone: '+351 926 789 012',
          contatoEmergenciaParentesco: 'Filha'
        },
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
            observacoes: 'Gengivas inflamadas.',
            evolucao: []
          }
        ],
        documentos: []
      },
      {
        id: 3,
        nome: 'Catarina Oliveira',
        nif: '456789123',
        niss: '33333333333',
        dataNascimento: '1992-07-08',
        telefone: '+351 934 567 890',
        email: 'catarina.oliveira@email.com',
        morada: 'Rua do Comércio, 789, Coimbra',
        codigoPostal: '3000-001',
        contactoEmergencia: 'Pedro Oliveira - +351 935 678 901',
        alergias: 'Látex',
        medicamentos: 'Contraceptivo oral',
        observacoes: 'Primeira consulta marcada',
        ultimaConsulta: null,
        anamnese: {
          queixaPrincipal: 'Avaliação geral',
          historicoMedico: 'Nenhum.',
          medicamentosUso: 'Contraceptivo oral',
          alergias: 'Látex',
          doencasPreexistentes: 'Nenhuma',
          habitos: 'Não fuma, não bebe.',
          contatoEmergenciaNome: 'Pedro Oliveira',
          contatoEmergenciaTelefone: '+351 935 678 901',
          contatoEmergenciaParentesco: 'Irmão'
        },
        historicoTratamentos: [],
        documentos: []
      }
    ];
    setPatients(samplePatients);
  }, []);

  const [newPatient, setNewPatient] = useState({
    nome: '',
    nif: '',
    niss: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    morada: '',
    codigoPostal: '',
    anamnese: {
      queixaPrincipal: '',
      historicoMedico: '',
      medicamentosUso: '',
      alergias: '',
      doencasPreexistentes: '',
      historicoOdontologico: '',
      habitos: '',
      contatoEmergenciaNome: '',
      contatoEmergenciaTelefone: '',
      contatoEmergenciaParentesco: ''
    },
    observacoes: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nif.includes(searchTerm) ||
    patient.telefone.includes(searchTerm)
  );

  const handleAddPatient = () => {
    if (newPatient.nome && newPatient.nif && newPatient.telefone) {
      const patient = {
        ...newPatient,
        id: patients.length + 1,
        ultimaConsulta: null
      };
      setPatients([...patients, patient]);
      setNewPatient({
        nome: '',
        nif: '',
        niss: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        morada: '',
        codigoPostal: '',
        contactoEmergencia: '',
        alergias: '',
        medicamentos: '',
        observacoes: ''
      });
      setIsAddModalOpen(false);
    }
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleFileUpload = (event, patientId) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDocument = {
          id: Date.now() + Math.random(), // ID temporário
          nome: file.name,
          tipo: file.type.startsWith('image/') ? 'Imagem' : 'Documento',
          categoria: file.type.startsWith('image/') ? 'Radiografia' : 'Laudo',
          url: e.target.result,
          dataUpload: new Date().toISOString().split('T')[0]
        };

        setPatients(prev => prev.map(patient => 
          patient.id === patientId 
            ? { ...patient, documentos: [...(patient.documentos || []), newDocument] }
            : patient
        ));

        // Atualizar o paciente selecionado se for o mesmo
        if (selectedPatient && selectedPatient.id === patientId) {
          setSelectedPatient(prev => ({
            ...prev,
            documentos: [...(prev.documentos || []), newDocument]
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    // Limpar o input
    event.target.value = '';
  };

  const handleDownloadFile = (doc) => {
    // Criar um link temporário para download
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.nome;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteFile = (patientId, docId) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { ...patient, documentos: patient.documentos.filter(doc => doc.id !== docId) }
        : patient
    ));

    // Atualizar o paciente selecionado se for o mesmo
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient(prev => ({
        ...prev,
        documentos: prev.documentos.filter(doc => doc.id !== docId)
      }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pacientes</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={newPatient.nome}
                  onChange={(e) => setNewPatient({...newPatient, nome: e.target.value})}
                  placeholder="Nome completo do paciente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nif">NIF *</Label>
                <Input
                  id="nif"
                  value={newPatient.nif}
                  onChange={(e) => setNewPatient({...newPatient, nif: e.target.value})}
                  placeholder="Número de Identificação Fiscal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niss">NISS</Label>
                <Input
                  id="niss"
                  value={newPatient.niss}
                  onChange={(e) => setNewPatient({...newPatient, niss: e.target.value})}
                  placeholder="Número de Identificação da Segurança Social"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={newPatient.dataNascimento}
                  onChange={(e) => setNewPatient({...newPatient, dataNascimento: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telemóvel *</Label>
                <Input
                  id="telefone"
                  value={newPatient.telefone}
                  onChange={(e) => setNewPatient({...newPatient, telefone: e.target.value})}
                  placeholder="+351 9XX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="morada">Morada</Label>
                <Input
                  id="morada"
                  value={newPatient.morada}
                  onChange={(e) => setNewPatient({...newPatient, morada: e.target.value})}
                  placeholder="Rua, número, cidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigoPostal">Código Postal</Label>
                <Input
                  id="codigoPostal"
                  value={newPatient.codigoPostal}
                  onChange={(e) => setNewPatient({...newPatient, codigoPostal: e.target.value})}
                  placeholder="0000-000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactoEmergencia">Contacto de Emergência</Label>
                <Input
                  id="contactoEmergencia"
                  value={newPatient.contactoEmergencia}
                  onChange={(e) => setNewPatient({...newPatient, contactoEmergencia: e.target.value})}
                  placeholder="Nome - Telefone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alergias">Alergias</Label>
                <Input
                  id="alergias"
                  value={newPatient.anamnese.alergias}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, alergias: e.target.value}}))}
                  placeholder="Alergias conhecidas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                <Input
                  id="medicamentos"
                  value={newPatient.anamnese.medicamentosUso}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, medicamentosUso: e.target.value}}))}
                  placeholder="Medicamentos em uso"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doencasPreexistentes">Doenças Preexistentes</Label>
                <Input
                  id="doencasPreexistentes"
                  value={newPatient.anamnese.doencasPreexistentes}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, doencasPreexistentes: e.target.value}}))}
                  placeholder="Doenças crônicas, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="historicoOdontologico">Histórico Odontológico</Label>
                <Input
                  id="historicoOdontologico"
                  value={newPatient.anamnese.historicoOdontologico}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, historicoOdontologico: e.target.value}}))}
                  placeholder="Tratamentos anteriores, problemas recorrentes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="habitos">Hábitos</Label>
                <Input
                  id="habitos"
                  value={newPatient.anamnese.habitos}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, habitos: e.target.value}}))}
                  placeholder="Fumo, álcool, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="queixaPrincipal">Queixa Principal</Label>
                <Input
                  id="queixaPrincipal"
                  value={newPatient.anamnese.queixaPrincipal}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, queixaPrincipal: e.target.value}}))}
                  placeholder="Principal motivo da consulta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contatoEmergenciaNome">Nome Contato Emergência</Label>
                <Input
                  id="contatoEmergenciaNome"
                  value={newPatient.anamnese.contatoEmergenciaNome}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, contatoEmergenciaNome: e.target.value}}))}
                  placeholder="Nome do contato de emergência"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contatoEmergenciaTelefone">Telefone Contato Emergência</Label>
                <Input
                  id="contatoEmergenciaTelefone"
                  value={newPatient.anamnese.contatoEmergenciaTelefone}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, contatoEmergenciaTelefone: e.target.value}}))}
                  placeholder="Telefone do contato de emergência"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contatoEmergenciaParentesco">Parentesco Contato Emergência</Label>
                <Input
                  id="contatoEmergenciaParentesco"
                  value={newPatient.anamnese.contatoEmergenciaParentesco}
                  onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, contatoEmergenciaParentesco: e.target.value}}))}
                  placeholder="Parentesco do contato de emergência"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={newPatient.observacoes}
                  onChange={(e) => setNewPatient({...newPatient, observacoes: e.target.value})}
                  placeholder="Observações adicionais sobre o paciente"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPatient}>
                Cadastrar Paciente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Pesquisar por nome, NIF ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {patient.nome}
              </CardTitle>
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
                Última consulta: {formatDate(patient.ultimaConsulta)}
              </div>
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

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'Nenhum paciente encontrado com os critérios de pesquisa.' : 'Nenhum paciente cadastrado ainda.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal de Visualização de Paciente */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Paciente: {selectedPatient?.nome}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <Tabs defaultValue="ficha-clinica" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="ficha-clinica" className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Ficha Clínica
                </TabsTrigger>
                <TabsTrigger value="historico-tratamentos" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Histórico
                </TabsTrigger>
                <TabsTrigger value="documentos-imagens" className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Documentos
                </TabsTrigger>
              </TabsList>
                         <TabsContent value="ficha-clinica">
                <div className="space-y-6 py-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Dados Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Nome Completo</p>
                          <p className="font-medium">{selectedPatient.nome}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Data de Nascimento</p>
                          <p className="font-medium">{formatDate(selectedPatient.dataNascimento)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Telefone</p>
                          <p className="font-medium">{selectedPatient.telefone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedPatient.email || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Anamnese
                    </h3>
                    <div className="space-y-4">
                      {selectedPatient.anamnese && (
                        <>
                          <div>
                            <p className="text-sm text-gray-600 font-medium">Queixa Principal</p>
                            <p className="text-gray-800 bg-white p-3 rounded border">{selectedPatient.anamnese.queixaPrincipal || 'Não informado'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 font-medium">Histórico Médico</p>
                            <p className="text-gray-800 bg-white p-3 rounded border">{selectedPatient.anamnese.historicoMedico || 'Não informado'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 font-medium">Medicamentos em Uso</p>
                            <p className="text-gray-800 bg-white p-3 rounded border">{selectedPatient.anamnese.medicamentos || 'Nenhum'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 font-medium">Alergias</p>
                            <p className="text-gray-800 bg-white p-3 rounded border">{selectedPatient.anamnese.alergias || 'Nenhuma'}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="historico-tratamentos">
                <div className="space-y-4 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Histórico de Tratamentos
                    </h3>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Tratamento
                    </Button>
                  </div>
                  {selectedPatient.historicoTratamentos && selectedPatient.historicoTratamentos.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPatient.historicoTratamentos.map((tratamento, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-md">{tratamento.tipoProcedimento} - {formatDate(tratamento.data)}</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p><strong>Dente/Região:</strong> {tratamento.denteRegiao}</p>
                            <p><strong>Dentista:</strong> {tratamento.dentistaResponsavel}</p>
                            <p><strong>Materiais:</strong> {tratamento.materiaisUtilizados}</p>
                            <p><strong>Valor Cobrado:</strong> €{tratamento.valorCobrado?.toFixed(2)}</p>
                            <p><strong>Valor Pago:</strong> €{tratamento.valorPago?.toFixed(2)}</p>
                            <p><strong>Status Pagamento:</strong> {tratamento.statusPagamento}</p>
                            <p><strong>Observações:</strong> {tratamento.observacoes}</p>
                            {tratamento.evolucao && tratamento.evolucao.length > 0 && (
                              <div className="mt-2">
                                <p className="font-semibold">Evolução:</p>
                                {tratamento.evolucao.map((evo, evoIndex) => (
                                  <p key={evoIndex} className="text-gray-600 text-xs">{formatDate(evo.data)}: {evo.descricao}</p>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Nenhum tratamento registrado para este paciente.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="documentos-imagens">
                <div className="space-y-4 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Documentos e Imagens</h3>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, selectedPatient.id)}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('file-upload').click()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Arquivo
                      </Button>
                    </div>
                  </div>
                  {selectedPatient.documentos && selectedPatient.documentos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {selectedPatient.documentos.map((doc, index) => (
                        <Card key={index} className="flex flex-col items-center justify-center p-4 text-center">
                          {doc.tipo === 'Imagem' ? (
                            <img src={doc.url} alt={doc.nome} className="w-24 h-24 object-cover mb-2 rounded" />
                          ) : (
                            <FileText className="w-12 h-12 text-blue-500 mb-2" />
                          )}
                          <p className="text-sm font-medium truncate w-full">{doc.nome}</p>
                          <p className="text-xs text-gray-500">{doc.categoria}</p>
                          <div className="flex gap-1 mt-2">
                            <Button variant="outline" size="sm" onClick={() => handleDownloadFile(doc)}>
                              Download
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteFile(selectedPatient.id, doc.id)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nenhum documento ou imagem anexado para este paciente.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => document.getElementById('file-upload').click()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Primeiro Arquivo
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientManagement;

