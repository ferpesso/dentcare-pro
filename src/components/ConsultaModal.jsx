import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'
import { 
  Clock, 
  User, 
  Phone, 
  Calendar,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const ConsultaModal = ({ consulta, isOpen, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(consulta || {})

  if (!consulta) return null

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(consulta)
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'bg-blue-100 text-blue-800'
      case 'Confirmada':
        return 'bg-green-100 text-green-800'
      case 'Em Andamento':
        return 'bg-yellow-100 text-yellow-800'
      case 'Concluída':
        return 'bg-gray-100 text-gray-800'
      case 'Cancelada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {consulta.paciente.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <DialogTitle className="text-xl">{consulta.paciente}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Badge className={getStatusColor(consulta.status || 'Agendada')}>
                    {consulta.status || 'Agendada'}
                  </Badge>
                </DialogDescription>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicar
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Paciente</Label>
              {isEditing ? (
                <Input
                  value={editData.paciente || ''}
                  onChange={(e) => setEditData({...editData, paciente: e.target.value})}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{consulta.paciente}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>
              {isEditing ? (
                <Input
                  value={editData.telefone || ''}
                  onChange={(e) => setEditData({...editData, telefone: e.target.value})}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{consulta.telefone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Data da Consulta</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editData.data || ''}
                  onChange={(e) => setEditData({...editData, data: e.target.value})}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{new Date(consulta.data).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Horário</Label>
              {isEditing ? (
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={editData.horario || ''}
                    onChange={(e) => setEditData({...editData, horario: e.target.value})}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Duração (min)"
                    value={editData.duracao || ''}
                    onChange={(e) => setEditData({...editData, duracao: parseInt(e.target.value)})}
                    className="w-24"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{consulta.horario} - {consulta.duracao} min</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tipo de Consulta</Label>
              {isEditing ? (
                <Select
                  value={editData.tipo || ''}
                  onValueChange={(value) => setEditData({...editData, tipo: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Limpeza">Limpeza</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Avaliação">Avaliação</SelectItem>
                    <SelectItem value="Urgência">Urgência</SelectItem>
                    <SelectItem value="Emergência">Emergência</SelectItem>
                    <SelectItem value="Retorno">Retorno</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-50 rounded">
                  <span>{consulta.tipo}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              {isEditing ? (
                <Select
                  value={editData.status || 'Agendada'}
                  onValueChange={(value) => setEditData({...editData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agendada">Agendada</SelectItem>
                    <SelectItem value="Confirmada">Confirmada</SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Concluída">Concluída</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getStatusColor(consulta.status || 'Agendada')}>
                  {consulta.status || 'Agendada'}
                </Badge>
              )}
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label>Observações da Consulta</Label>
            {isEditing ? (
              <Textarea
                placeholder="Adicione observações sobre a consulta..."
                value={editData.observacoes || ''}
                onChange={(e) => setEditData({...editData, observacoes: e.target.value})}
                rows={3}
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded min-h-20">
                <span className="text-gray-700">
                  {consulta.observacoes || 'Nenhuma observação registrada.'}
                </span>
              </div>
            )}
          </div>

          {/* Alertas e Lembretes */}
          {consulta.alertas && consulta.alertas.length > 0 && (
            <div className="space-y-2">
              <Label>Alertas e Lembretes</Label>
              <div className="space-y-2">
                {consulta.alertas.map((alerta, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-800">{alerta}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Retorno Programado */}
          {(consulta.retorno || isEditing) && (
            <div className="space-y-2">
              <Label>Retorno Programado</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editData.retorno || ''}
                  onChange={(e) => setEditData({...editData, retorno: e.target.value})}
                />
              ) : (
                <div className="p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-green-800">
                    {consulta.retorno ? new Date(consulta.retorno).toLocaleDateString('pt-BR') : 'Não programado'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Ações */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="destructive" onClick={() => onDelete(consulta.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Consulta
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline">
                Enviar Lembrete
              </Button>
              <Button variant="outline">
                Confirmar Consulta
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConsultaModal

