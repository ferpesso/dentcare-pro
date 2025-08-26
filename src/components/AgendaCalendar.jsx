import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import ConsultaModal from './ConsultaModal.jsx'
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  Plus,
  Clock,
  User,
  Phone,
  X
} from 'lucide-react'

const AgendaCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 7)) // 7 de julho de 2025
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverSlot, setDragOverSlot] = useState(null)
  const [selectedConsulta, setSelectedConsulta] = useState(null)
  const [showConsultaModal, setShowConsultaModal] = useState(false)
  const [showNovaConsultaModal, setShowNovaConsultaModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState({ date: null, time: null })
  const [novaConsultaData, setNovaConsultaData] = useState({
    paciente: '',
    telefone: '',
    tipo: '',
    data: '',
    horario: '',
    observacoes: ''
  })
  const [searchTerm, setSearchTerm] = useState('') // Novo estado para o termo de busca
  const dragRef = useRef(null)

  // Dados das consultas
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: 'Maria Silva',
      tipo: 'Limpeza',
      telefone: '912 345 678',
      data: '2025-07-07',
      horario: '09:00',
      duracao: 60,
      cor: 'green',
      status: 'Confirmada',
      observacoes: 'Paciente com sensibilidade dentária. Usar pasta específica.',
      alertas: ['Com alerta de retorno programado para 09/08/2025'],
      retorno: '2025-08-09'
    },
    {
      id: 2,
      paciente: 'João Costa',
      tipo: 'Consulta',
      telefone: '934 567 890',
      data: '2025-07-07',
      horario: '13:00',
      duracao: 30,
      cor: 'blue',
      status: 'Agendada',
      observacoes: 'Primeira consulta. Verificar histórico médico.',
      alertas: []
    },
    {
      id: 3,
      paciente: 'Ana Santos',
      tipo: 'Avaliação',
      telefone: '967 890 123',
      data: '2025-07-08',
      horario: '10:00',
      duracao: 45,
      cor: 'pink',
      status: 'Agendada',
      observacoes: 'Avaliação para possível tratamento ortodôntico.',
      alertas: []
    },
    {
      id: 4,
      paciente: 'Emergência',
      tipo: 'Urgência',
      telefone: '999 999 999',
      data: '2025-07-09',
      horario: '08:00',
      duracao: 30,
      cor: 'red',
      status: 'Em Andamento',
      observacoes: 'Dor intensa no dente 36. Possível canal.',
      alertas: ['Paciente com dor intensa']
    },
    {
      id: 5,
      paciente: 'Sofia Oliveira',
      tipo: 'Limpeza',
      telefone: '910 111 222',
      data: '2025-07-10',
      horario: '11:00',
      duracao: 60,
      cor: 'green',
      status: 'Agendada',
      observacoes: 'Limpeza de rotina. Paciente regular.',
      alertas: []
    },
    {
      id: 6,
      paciente: 'Carlos Mendes',
      tipo: 'Consulta',
      telefone: '930 405 060',
      data: '2025-07-11',
      horario: '09:00',
      duracao: 30,
      cor: 'blue',
      status: 'Agendada',
      observacoes: 'Retorno para avaliação de restauração.',
      alertas: []
    },
    {
      id: 7,
      paciente: 'Pedro Almeida',
      tipo: 'Consulta',
      telefone: '911 222 333',
      data: '2025-07-07',
      horario: '09:00',
      duracao: 30,
      cor: 'blue',
      status: 'Agendada',
      observacoes: 'Nova consulta para avaliação.',
      alertas: []
    },
    {
      id: 8,
      paciente: 'Joana Pereira',
      tipo: 'Limpeza',
      telefone: '914 555 666',
      data: '2025-07-07',
      horario: '09:00',
      duracao: 45,
      cor: 'green',
      status: 'Agendada',
      observacoes: 'Limpeza de rotina.',
      alertas: []
    }
  ])

  // Configurações da agenda
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ]

  // Gerar dias da semana atual
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(currentDate.getDate() - day)
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    return days
  }

  const weekDays = getWeekDays()

  // Lógica de filtragem
  const filteredConsultas = consultas.filter(consulta => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return (
      consulta.paciente.toLowerCase().includes(lowerCaseSearchTerm) ||
      consulta.tipo.toLowerCase().includes(lowerCaseSearchTerm) ||
      consulta.telefone.toLowerCase().includes(lowerCaseSearchTerm) ||
      consulta.observacoes.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })

  // Funções de navegação
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // Funções de drag and drop
  const handleDragStart = (e, consulta) => {
    setDraggedItem(consulta)
    e.dataTransfer.effectAllowed = 'move'
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverSlot(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e, data, horario) => {
    e.preventDefault()
    setDragOverSlot({ data, horario })
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverSlot(null)
    }
  }

  const handleDrop = (e, targetDate, targetHorario) => {
    e.preventDefault()
    
    if (draggedItem) {
      setConsultas(prev => prev.map(consulta => 
        consulta.id === draggedItem.id 
          ? { 
              ...consulta, 
              data: targetDate.toISOString().split('T')[0],
              horario: targetHorario 
            }
          : consulta
      ))
    }
    
    setDraggedItem(null)
    setDragOverSlot(null)
  }

  // Função para clique na consulta
  const handleConsultaClick = (consulta) => {
    setSelectedConsulta(consulta)
    setShowConsultaModal(true)
  }

  // Função para clique em slot vazio
  const handleSlotClick = (date, horario) => {
    const consulta = getConsultaForSlot(date, horario)
    if (consulta) {
      handleConsultaClick(consulta)
    } else {
      setSelectedSlot({
        date: date.toISOString().split('T')[0],
        time: horario
      })
      setNovaConsultaData({
        paciente: '',
        telefone: '',
        tipo: '',
        data: date.toISOString().split('T')[0],
        horario: horario,
        observacoes: ''
      })
      setShowNovaConsultaModal(true)
    }
  }

  // Função para salvar nova consulta
  const handleSaveNovaConsulta = () => {
    if (!novaConsultaData.paciente || !novaConsultaData.tipo) {
      alert('Por favor, preencha os campos obrigatórios: Paciente e Tipo de Consulta')
      return
    }

    const novaConsulta = {
      id: Date.now(),
      ...novaConsultaData,
      duracao: 30,
      status: 'Agendada',
      cor: getTipoColor(novaConsultaData.tipo),
      alertas: []
    }
    
    setConsultas(prev => [...prev, novaConsulta])
    setShowNovaConsultaModal(false)
    setNovaConsultaData({
      paciente: '',
      telefone: '',
      tipo: '',
      data: '',
      horario: '',
      observacoes: ''
    })
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

  // Função para atualizar consulta
  const handleUpdateConsulta = (consultaAtualizada) => {
    setConsultas(prev => prev.map(consulta => 
      consulta.id === consultaAtualizada.id ? consultaAtualizada : consulta
    ))
  }

  // Função para deletar consulta
  const handleDeleteConsulta = (consultaId) => {
    setConsultas(prev => prev.filter(consulta => consulta.id !== consultaId))
    setShowConsultaModal(false)
  }

  // Função para obter consultas em horário específico
  const getConsultasForSlot = (date, horario) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredConsultas.filter(consulta => 
      consulta.data === dateStr && consulta.horario === horario
    );
  };

  // Função para verificar se um slot está sendo destacado
  const isSlotHighlighted = (date, horario) => {
    if (!dragOverSlot) return false
    const dateStr = date.toISOString().split('T')[0]
    const targetDateStr = dragOverSlot.data.toISOString().split('T')[0]
    return dateStr === targetDateStr && horario === dragOverSlot.horario
  }

  // Cores para diferentes tipos de consulta
  const getCorConsulta = (tipo) => {
    const cores = {
      'Limpeza': 'bg-green-100 text-green-800 border-green-200',
      'Consulta': 'bg-blue-100 text-blue-800 border-blue-200',
      'Avaliação': 'bg-pink-100 text-pink-800 border-pink-200',
      'Urgência': 'bg-red-100 text-red-800 border-red-200',
      'Emergência': 'bg-red-100 text-red-800 border-red-200'
    }
    return cores[tipo] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Header da Agenda */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm items-center">
            <Input 
              id="search"
              type="text"
              placeholder="Buscar consulta..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Search className="h-4 w-4 text-muted-foreground" />
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm" onClick={() => {
            setNovaConsultaData({
              paciente: "",
              telefone: '',
              tipo: '',
              data: new Date().toISOString().split('T')[0],
              horario: '09:00',
              observacoes: ''
            })
            setShowNovaConsultaModal(true)
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span>
                {currentDate.toLocaleDateString('pt-BR', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <Button variant="outline" size="sm" onClick={goToNextWeek}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">Dia</Button>
              <Button size="sm">Semana</Button>
              <Button variant="outline" size="sm">Mês</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Cabeçalho dos dias */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="text-center font-semibold text-gray-600 p-2">
              Horário
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-semibold text-gray-600 p-2">
                <div>{diasSemana[day.getDay()]}</div>
                <div className="text-lg">{day.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Grade de horários */}
          <div className="grid grid-cols-8 gap-2">
            {horarios.map(horario => (
              <div key={horario} className="contents">
                {/* Coluna de horário */}
                <div className="text-sm text-gray-600 p-2 text-right border-r border-gray-200">
                  {horario}
                </div>
                
                {/* Slots para cada dia */}
                {weekDays.map((day, dayIndex) => {
                  const consultasNoSlot = getConsultasForSlot(day, horario);
                  const isHighlighted = isSlotHighlighted(day, horario);
                  
                  return (
                    <div
                      key={`${dayIndex}-${horario}`}
                      className={`min-h-12 p-1 border border-gray-200 rounded transition-colors cursor-pointer ${
                        isHighlighted ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'
                      } flex flex-col gap-1`}
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => handleDragEnter(e, day, horario)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, day, horario)}
                      onClick={() => handleSlotClick(day, horario)}
                    >
                      {consultasNoSlot.map(consulta => (
                        <div
                          key={consulta.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, consulta)}
                          onDragEnd={handleDragEnd}
                          className={`p-1 rounded cursor-move border transition-all hover:shadow-md ${getCorConsulta(consulta.tipo)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConsultaClick(consulta);
                          }}
                        >
                          <div className="text-xs font-semibold truncate">
                            {consulta.paciente}
                          </div>
                          <div className="text-xs opacity-75 truncate">
                            {consulta.tipo}
                          </div>
                          <div className="flex items-center gap-1 text-xs opacity-75 mt-1">
                            <Clock className="w-3 h-3" />
                            {consulta.horario}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-600">Limpeza</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Consulta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-100 border border-pink-200 rounded"></div>
              <span className="text-sm text-gray-600">Avaliação</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm text-gray-600">Urgência/Emergência</span>
            </div>
          </div>

          {/* Instruções de uso */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Dicas:</strong> Clique em uma consulta para ver detalhes e editar. Clique em um horário vazio para agendar nova consulta. Arraste consultas para reorganizar horários.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Consulta */}
      <ConsultaModal
        consulta={selectedConsulta}
        isOpen={showConsultaModal}
        onClose={() => {
          setShowConsultaModal(false)
          setSelectedConsulta(null)
        }}
        onUpdate={handleUpdateConsulta}
        onDelete={handleDeleteConsulta}
      />

      {/* Modal Simples de Nova Consulta */}
      {showNovaConsultaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Nova Consulta</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNovaConsultaModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Paciente *</Label>
                <Input
                  placeholder="Nome do paciente"
                  value={novaConsultaData.paciente}
                  onChange={(e) => setNovaConsultaData({...novaConsultaData, paciente: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Telefone</Label>
                <Input
                  placeholder="Telefone do paciente"
                  value={novaConsultaData.telefone}
                  onChange={(e) => setNovaConsultaData({...novaConsultaData, telefone: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Tipo de Consulta *</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={novaConsultaData.tipo}
                  onChange={(e) => setNovaConsultaData({...novaConsultaData, tipo: e.target.value})}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Consulta">Consulta</option>
                  <option value="Avaliação">Avaliação</option>
                  <option value="Urgência">Urgência</option>
                  <option value="Emergência">Emergência</option>
                  <option value="Retorno">Retorno</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={novaConsultaData.data}
                    onChange={(e) => setNovaConsultaData({...novaConsultaData, data: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Horário</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={novaConsultaData.horario}
                    onChange={(e) => setNovaConsultaData({...novaConsultaData, horario: e.target.value})}
                  >
                    {horarios.map(horario => (
                      <option key={horario} value={horario}>{horario}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label>Observações</Label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  placeholder="Observações sobre a consulta..."
                  value={novaConsultaData.observacoes}
                  onChange={(e) => setNovaConsultaData({...novaConsultaData, observacoes: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowNovaConsultaModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveNovaConsulta}
                className="flex-1"
                disabled={!novaConsultaData.paciente || !novaConsultaData.tipo}
              >
                Agendar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgendaCalendar

