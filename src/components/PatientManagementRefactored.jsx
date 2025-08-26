import React, { useState, useEffect } from 'react';
import PatientList from './PatientList.jsx';
import AddPatientModal from './AddPatientModal.jsx';
import ViewPatientModal from './ViewPatientModal.jsx';

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
    contactoEmergencia: '',
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

  const handleAddPatient = () => {
    if (newPatient.nome && newPatient.nif && newPatient.telefone) {
      const patient = {
        ...newPatient,
        id: patients.length + 1,
        ultimaConsulta: null,
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
        email: '',
        morada: '',
        codigoPostal: '',
        contactoEmergencia: '',
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
      </div>

      <PatientList
        patients={patients}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onViewPatient={handleViewPatient}
        onAddPatient={() => setIsAddModalOpen(true)}
        formatDate={formatDate}
      />

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newPatient={newPatient}
        setNewPatient={setNewPatient}
        onAddPatient={handleAddPatient}
      />

      <ViewPatientModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        patient={selectedPatient}
        formatDate={formatDate}
        onFileUpload={handleFileUpload}
        onDownloadFile={handleDownloadFile}
        onDeleteFile={handleDeleteFile}
      />
    </div>
  );
};

export default PatientManagement;

