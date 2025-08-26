import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Plus, Activity } from 'lucide-react';

const TreatmentHistoryTab = ({ patient, formatDate }) => {
  return (
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
      {patient.historicoTratamentos && patient.historicoTratamentos.length > 0 ? (
        <div className="space-y-4">
          {patient.historicoTratamentos.map((tratamento, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-md flex items-center justify-between">
                  <span>{tratamento.tipoProcedimento}</span>
                  <span className="text-sm text-gray-500">{formatDate(tratamento.data)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Dente/Região:</p>
                    <p className="text-gray-600">{tratamento.denteRegiao}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Dentista:</p>
                    <p className="text-gray-600">{tratamento.dentistaResponsavel}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Materiais:</p>
                    <p className="text-gray-600">{tratamento.materiaisUtilizados}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Status Pagamento:</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tratamento.statusPagamento === 'Pago' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tratamento.statusPagamento}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Valor Cobrado:</p>
                    <p className="text-gray-600">€{tratamento.valorCobrado?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Valor Pago:</p>
                    <p className="text-gray-600">€{tratamento.valorPago?.toFixed(2)}</p>
                  </div>
                </div>

                {tratamento.observacoes && (
                  <div>
                    <p className="font-medium text-gray-700">Observações:</p>
                    <p className="text-gray-600 bg-gray-50 p-2 rounded">{tratamento.observacoes}</p>
                  </div>
                )}

                {tratamento.evolucao && tratamento.evolucao.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Evolução:</p>
                    <div className="space-y-1">
                      {tratamento.evolucao.map((evo, evoIndex) => (
                        <div key={evoIndex} className="text-xs bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                          <span className="font-medium">{formatDate(evo.data)}:</span> {evo.descricao}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Nenhum tratamento registrado para este paciente.</p>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeiro Tratamento
          </Button>
        </div>
      )}
    </div>
  );
};

export default TreatmentHistoryTab;

