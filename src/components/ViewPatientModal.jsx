import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { UserCheck, Activity, FolderOpen } from 'lucide-react';
import PatientDetailsTab from './PatientDetailsTab.jsx';
import TreatmentHistoryTab from './TreatmentHistoryTab.jsx';
import DocumentsImagesTab from './DocumentsImagesTab.jsx';

const ViewPatientModal = ({ 
  isOpen, 
  onClose, 
  patient, 
  formatDate,
  onFileUpload,
  onDownloadFile,
  onDeleteFile
}) => {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Paciente: {patient.nome}</DialogTitle>
        </DialogHeader>
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
            <PatientDetailsTab patient={patient} formatDate={formatDate} />
          </TabsContent>
          
          <TabsContent value="historico-tratamentos">
            <TreatmentHistoryTab patient={patient} formatDate={formatDate} />
          </TabsContent>
          
          <TabsContent value="documentos-imagens">
            <DocumentsImagesTab 
              patient={patient}
              onFileUpload={onFileUpload}
              onDownloadFile={onDownloadFile}
              onDeleteFile={onDeleteFile}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPatientModal;

