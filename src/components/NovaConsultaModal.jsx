import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Calendar,
  Clock,
  User,
  Phone,
  Search,
  Plus,
  CheckCircle,
  Bell
} from 'lucide-react'

const NovaConsultaModal = ({ isOpen, onClose, onSave, selectedDate, selectedTime }) => {
  const [activeTab, setActiveTab] = useState('consulta')
  const [formData, setFormData] = useState({
    paciente: '',
    telefone: '',
    data: selectedDate || new Date().toISOString().split('T')[0],
    horario: selectedTime || '09:00',
    duracao: 30,
    tipo: '',
    observacoes: '',
    profissional: 'Dr. Fernando Pessoa',
    retorno: '',
    enviarLembrete: true
  })

  const [searchPaciente, setSearchPaciente] = useState('')
  const [pacientesSugeridos] = useState([
    { id: 1, nome: 'Maria Silva', telefone: '912 345 678', ultimaConsulta: '15/06/2025' },
    { id: 2, nome: 'João Costa', telefone: '934 567 890', ultimaConsulta: '22/06/2025' },
    { id: 3, nome: 'Ana Santos', telefone: '967 890 123', ultimaConsulta: '10/05/2025' },
    { id: 4, nome: 'Pedro Lima', telefone: '923 456 789', ultimaConsulta: '28/06/2025' }
  ])

  const handleSave = () => {
    if (!formData.paciente || !formData.tipo) {
      alert('Por favor, preencha os campos obrigatórios: Paciente e Tipo de Consulta')
      return
    }

    const novaConsulta = {
      id: Date.now(),
      ...formData,
      status: 'Agendada',
      cor: getTipoColor(formData.tipo)
    }
    onSave(novaConsulta)
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      paciente: '',
      telefone: '',
      data: selectedDate || new Date().toISOString().split('T')[0],
      horario: selectedTime || '09:00',
      duracao: 30,
      tipo: '',
      observacoes: '',
      profissional: 'Dr. Fernando Pessoa',
      retorno: '',
      enviarLembrete: true
    })
    setSearchPaciente('')
    setActiveTab('consulta')
  }

  const getTipoColor = (tipo) => {
    const cores = {
      'Limpeza': 'green',
      'Consulta': 'blue',
      'Avaliação': 'pink',
      'Urgência': 'red',
      'Emergência': 'red',
      'Retorno': 'purple'
    }
    return cores[tipo] || 'blue'
  }

  const selecionarPaciente = (paciente) => {
    setFormData({
      ...formData,
      paciente: paciente.nome,
      telefone: paciente.telefone
    })
    setSearchPaciente(paciente.nome)
  }

  const pacientesFiltrados = pacientesSugeridos.filter(p => 
    p.nome.toLowerCase().includes(searchPaciente.toLowerCase())
  )

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Nova Consulta
          </DialogTitle>
          <DialogDescription>
            Agende uma nova consulta {selectedDate && `para ${new Date(selectedDate).toLocaleDateString('pt-BR')}`} {selectedTime && `às ${selectedTime}`}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consulta">Consulta</TabsTrigger>
            <TabsTrigger value="compromisso">Compromisso</TabsTrigger>
          </TabsList>

          <TabsContent value="consulta" className="space-y-6">
            {/* Busca de Paciente */}
            <div className="space-y-2">
              <Label>Paciente *</Label>
              <div className="relative">
                <Input
                  placeholder="Buscar paciente"
                  value={searchPaciente}
                  onChange={(e) => {
                    setSearchPaciente(e.target.value)
                    setFormData({...formData, paciente: e.target.value})
                  }}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              
              {searchPaciente && pacientesFiltrados.length > 0 && (
                <div className="border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                  {pacientesFiltrados.map(paciente => (
                    <div
                      key={paciente.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => selecionarPaciente(paciente)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{paciente.nome}</p>
                          <p className="text-sm text-gray-600">{paciente.telefone}</p>
                        </div>
                        <p className="text-xs text-gray-500">Última: {paciente.ultimaConsulta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar novo paciente
              </Button>
            </div>

            {/* Informações da Consulta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Profissional *</Label>
                <Select
                  value={formData.profissional}
                  onValueChange={(value) => setFormData({...formData, profissional: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Fernando Pessoa">Dr. Fernando Pessoa</SelectItem>
                    <SelectItem value="Dra. Maria Santos">Dra. Maria Santos</SelectItem>
                    <SelectItem value="Dr. João Silva">Dr. João Silva</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Consulta *</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) => setFormData({...formData, tipo: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Limpeza">Limpeza e Profilaxia</SelectItem>
                    <SelectItem value="Consulta">Consulta de Rotina</SelectItem>
                    <SelectItem value="Avaliação">Avaliação Inicial</SelectItem>
                    <SelectItem value="Urgência">Urgência</SelectItem>
                    <SelectItem value="Emergência">Emergência</SelectItem>
                    <SelectItem value="Retorno">Retorno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data da Consulta *</Label>
                <Input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Horário de Início *</Label>
                <Select
                  value={formData.horario}
                  onValueChange={(value) => setFormData({...formData, horario: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {horariosDisponiveis.map(horario => (
                      <SelectItem key={horario} value={horario}>{horario}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Duração da Consulta (min) *</Label>
                <Select
                  value={formData.duracao.toString()}
                  onValueChange={(value) => setFormData({...formData, duracao: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1h 30min</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  placeholder="Telefone do paciente"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label>Observação</Label>
              <Textarea
                placeholder="Adicione observações sobre a consulta..."
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                rows={3}
              />
              <p className="text-xs text-gray-500">{formData.observacoes.length} / 500</p>
            </div>

            {/* Retorno */}
            <div className="space-y-2">
              <Label>Retornar em</Label>
              <Select
                value={formData.retorno}
                onValueChange={(value) => setFormData({...formData, retorno: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sem retorno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sem retorno</SelectItem>
                  <SelectItem value="1_semana">1 semana</SelectItem>
                  <SelectItem value="2_semanas">2 semanas</SelectItem>
                  <SelectItem value="1_mes">1 mês</SelectItem>
                  <SelectItem value="3_meses">3 meses</SelectItem>
                  <SelectItem value="6_meses">6 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opções */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lembrete"
                checked={formData.enviarLembrete}
                onChange={(e) => setFormData({...formData, enviarLembrete: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="lembrete" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Enviar confirmação e lembrete de consulta automático
              </Label>
            </div>

            {/* Encontrar Horário Livre */}
            <Button variant="outline" className="w-full">
              Encontrar horário livre
            </Button>
          </TabsContent>

          <TabsContent value="compromisso" className="space-y-6">
            <div className="text-center py-8">
              <p className="text-gray-500">Funcionalidade de compromisso será implementada em breve.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline">
              Selecione um rótulo
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={handleSave} disabled={!formData.paciente || !formData.tipo}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Marcar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NovaConsultaModal

