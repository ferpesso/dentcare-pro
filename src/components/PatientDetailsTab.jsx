import React from 'react';
import { User, Phone, Mail, Calendar, Activity } from 'lucide-react';

const PatientDetailsTab = ({ patient, formatDate }) => {
  return (
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
              <p className="font-medium">{patient.nome}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Data de Nascimento</p>
              <p className="font-medium">{formatDate(patient.dataNascimento)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-medium">{patient.telefone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{patient.email || 'N/A'}</p>
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
          {patient.anamnese && (
            <>
              <div>
                <p className="text-sm text-gray-600 font-medium">Queixa Principal</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.queixaPrincipal || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Histórico Médico</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.historicoMedico || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Medicamentos em Uso</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.medicamentosUso || 'Nenhum'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Alergias</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.alergias || 'Nenhuma'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Doenças Preexistentes</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.doencasPreexistentes || 'Nenhuma'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Histórico Odontológico</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.historicoOdontologico || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Hábitos</p>
                <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese.habitos || 'N/A'}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Contato de Emergência
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 font-medium">Nome</p>
            <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese?.contatoEmergenciaNome || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Telefone</p>
            <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese?.contatoEmergenciaTelefone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Parentesco</p>
            <p className="text-gray-800 bg-white p-3 rounded border">{patient.anamnese?.contatoEmergenciaParentesco || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsTab;

