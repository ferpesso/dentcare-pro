import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog.jsx';

const AddPatientModal = ({ 
  isOpen, 
  onClose, 
  newPatient, 
  setNewPatient, 
  onAddPatient 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              placeholder="+351 9XX XXX XXX"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contatoEmergenciaParentesco">Parentesco Contato Emergência</Label>
            <Input
              id="contatoEmergenciaParentesco"
              value={newPatient.anamnese.contatoEmergenciaParentesco}
              onChange={(e) => setNewPatient(prev => ({...prev, anamnese: {...prev.anamnese, contatoEmergenciaParentesco: e.target.value}}))}
              placeholder="Cônjuge, filho(a), etc."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onAddPatient}>
            Cadastrar Paciente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;

