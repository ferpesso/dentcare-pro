import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Search, Plus, Eye, Edit, Phone, Mail, Calendar, Users } from 'lucide-react';

const PatientList = ({ 
  patients, 
  searchTerm, 
  setSearchTerm, 
  onViewPatient, 
  onAddPatient,
  formatDate 
}) => {
  const filteredPatients = patients.filter(patient =>
    patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.nif.includes(searchTerm) ||
    patient.telefone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Barra de Pesquisa */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Pesquisar por nome, NIF ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={onAddPatient}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
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
                  onClick={() => onViewPatient(patient)}
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
              {searchTerm ? 'Nenhum paciente encontrado com os critérios de pesquisa.' : 'Nenhum paciente cadastrado ainda.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientList;

