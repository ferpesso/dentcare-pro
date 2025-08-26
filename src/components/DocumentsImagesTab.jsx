import React from 'react';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Plus, FileText, X, FolderOpen } from 'lucide-react';

const DocumentsImagesTab = ({ 
  patient, 
  onFileUpload, 
  onDownloadFile, 
  onDeleteFile 
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-600" />
          Documentos e Imagens
        </h3>
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            onChange={(e) => onFileUpload(e, patient.id)}
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
      
      {patient.documentos && patient.documentos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {patient.documentos.map((doc, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-4 text-center hover:shadow-md transition-shadow">
              {doc.tipo === 'Imagem' ? (
                <img 
                  src={doc.url} 
                  alt={doc.nome} 
                  className="w-24 h-24 object-cover mb-2 rounded border"
                />
              ) : (
                <FileText className="w-12 h-12 text-blue-500 mb-2" />
              )}
              <p className="text-sm font-medium truncate w-full mb-1" title={doc.nome}>
                {doc.nome}
              </p>
              <p className="text-xs text-gray-500 mb-2">{doc.categoria}</p>
              <p className="text-xs text-gray-400 mb-3">{doc.dataUpload}</p>
              <div className="flex gap-1 w-full">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDownloadFile(doc)}
                  className="flex-1 text-xs"
                >
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDeleteFile(patient.id, doc.id)}
                  className="px-2"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Nenhum documento ou imagem anexado para este paciente.</p>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload').click()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeiro Arquivo
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentsImagesTab;

