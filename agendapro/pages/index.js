import React, { useState } from 'react';
import { Calendar, Clock, Users, Settings, Mail, Video, CheckCircle, ArrowLeft, Plus, Trash2, Edit3, Eye, Share2, BarChart3, Bell, User, LogOut } from 'lucide-react';

const CalendlyClone = () => {
  const [currentView, setCurrentView] = useState('user-dashboard'); // 'user-dashboard' ou 'public-booking'
  const [selectedUserId, setSelectedUserId] = useState('iago_oliveira');
  
  // Dados do usuário logado (visão interna)
  const [currentUser, setCurrentUser] = useState({
    id: 'iago_oliveira',
    name: 'Iago de Oliveira',
    email: 'iago.oliveira@lincros.com',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQFs42OVDI03zw/profile-displayphoto-shrink_200_200/B4DZXom6H3HIAc-/0/1743364268918?e=1753920000&v=beta&t=Xce5knDt1YLuKkdje9eFOTpRXzJ40TUIAT_IOSvW95o',
    role: 'Consultor de Dados',
    company: 'Lincros'
  });

  // Dados dos usuários disponíveis para agendamento público
  const [users, setUsers] = useState({
    'iago_oliveira': {
      id: 'iago_oliveira',
      name: 'Iago de Oliveira',
      email: 'iago.oliveira@lincros.com',
      avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQFs42OVDI03zw/profile-displayphoto-shrink_200_200/B4DZXom6H3HIAc-/0/1743364268918?e=1753920000&v=beta&t=Xce5knDt1YLuKkdje9eFOTpRXzJ40TUIAT_IOSvW95o',
      role: 'Consultor de Dados',
      company: 'Lincros',
      bio: 'Especializado em transformar Dados em Insights',
      timezone: 'America/Sao_Paulo'
    },
    'maria-santos': {
      id: 'maria-santos',
      name: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      role: 'Gerente Comercial',
      company: 'Empresa LTDA',
      bio: 'Especialista em vendas B2B e desenvolvimento de parcerias.',
      timezone: 'America/Sao_Paulo'
    }
  });
  
  const [meetingTypes, setMeetingTypes] = useState({
    'iago_oliveira': [
      {
        id: 1,
        title: 'Consulta de 30 minutos',
        duration: 30,
        description: 'Reunião rápida para discussão de projetos e estratégias',
        link: 'consulta-30min',
        active: true,
        color: 'blue'
      },
      {
        id: 2,
        title: 'Reunião Comercial',
        duration: 60,
        description: 'Apresentação detalhada de propostas e soluções',
        link: 'comercial',
        active: true,
        color: 'purple'
      },
      {
        id: 3,
        title: 'Workshop Estratégico',
        duration: 120,
        description: 'Sessão aprofundada de planejamento estratégico',
        link: 'workshop',
        active: false,
        color: 'green'
      }
    ],
    'maria-santos': [
      {
        id: 4,
        title: 'Demo do Produto',
        duration: 45,
        description: 'Demonstração completa da nossa solução',
        link: 'demo',
        active: true,
        color: 'blue'
      },
      {
        id: 5,
        title: 'Reunião de Vendas',
        duration: 30,
        description: 'Discussão sobre oportunidades comerciais',
        link: 'vendas',
        active: true,
        color: 'green'
      }
    ]
  });

  const [availability, setAvailability] = useState({
    'iago_oliveira': {
      monday: { active: true, start: '09:00', end: '17:00' },
      tuesday: { active: true, start: '09:00', end: '17:00' },
      wednesday: { active: true, start: '09:00', end: '17:00' },
      thursday: { active: true, start: '09:00', end: '17:00' },
      friday: { active: true, start: '09:00', end: '16:00' },
      saturday: { active: false, start: '09:00', end: '17:00' },
      sunday: { active: false, start: '09:00', end: '17:00' }
    },
    'maria-santos': {
      monday: { active: true, start: '08:00', end: '18:00' },
      tuesday: { active: true, start: '08:00', end: '18:00' },
      wednesday: { active: true, start: '08:00', end: '18:00' },
      thursday: { active: true, start: '08:00', end: '18:00' },
      friday: { active: true, start: '08:00', end: '17:00' },
      saturday: { active: false, start: '09:00', end: '17:00' },
      sunday: { active: false, start: '09:00', end: '17:00' }
    }
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      userId: 'iago_oliveira',
      title: 'Reunião com Maria Santos',
      date: '2025-05-28',
      time: '14:00',
      clientName: 'Maria Santos',
      clientEmail: 'maria@cliente.com',
      type: 'Consulta de 30 minutos',
      status: 'confirmed',
      message: 'Gostaria de discutir estratégias de marketing digital'
    },
    {
      id: 2,
      userId: 'iago_oliveira',
      title: 'Call com Pedro Oliveira',
      date: '2025-05-29',
      time: '10:30',
      clientName: 'Pedro Oliveira',
      clientEmail: 'pedro@cliente.com',
      type: 'Reunião Comercial',
      status: 'pending',
      message: 'Interessado em conhecer mais sobre nossos serviços'
    },
    {
      id: 3,
      userId: 'maria-santos',
      title: 'Demo para TechCorp',
      date: '2025-05-28',
      time: '15:00',
      clientName: 'Ana Costa',
      clientEmail: 'ana@techcorp.com',
      type: 'Demo do Produto',
      status: 'confirmed',
      message: 'Demo para equipe técnica'
    }
  ]);

  // Estados para agendamento público
  const [selectedMeetingType, setSelectedMeetingType] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', message: '' });
  const [bookingStep, setBookingStep] = useState('select-meeting'); // 'select-meeting', 'select-date', 'select-time', 'form', 'success'

  const generateTimeSlots = (userId, date) => {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
    const dayConfig = availability[userId]?.[dayName];
    
    if (!dayConfig?.active) return [];
    
    const slots = [];
    const start = parseInt(dayConfig.start.split(':')[0]);
    const end = parseInt(dayConfig.end.split(':')[0]);
    
    // Filtrar horários já ocupados
    const bookedTimes = appointments
      .filter(apt => apt.userId === userId && apt.date === date)
      .map(apt => apt.time);
    
    for (let hour = start; hour < end; hour++) {
      const time1 = `${hour.toString().padStart(2, '0')}:00`;
      const time2 = `${hour.toString().padStart(2, '0')}:30`;
      
      if (!bookedTimes.includes(time1)) slots.push(time1);
      if (!bookedTimes.includes(time2)) slots.push(time2);
    }
    
    return slots;
  };

  const bookAppointment = () => {
    if (!selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      userId: selectedUserId,
      title: `Reunião com ${clientInfo.name}`,
      date: selectedDate,
      time: selectedTime,
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      type: selectedMeetingType.title,
      status: 'confirmed',
      message: clientInfo.message
    };

    setAppointments([...appointments, newAppointment]);
    setBookingStep('success');
  };

  const resetBooking = () => {
    setSelectedMeetingType(null);
    setSelectedDate('');
    setSelectedTime('');
    setClientInfo({ name: '', email: '', message: '' });
    setBookingStep('select-meeting');
  };

  // VISÃO DO USUÁRIO (Dashboard Interno)
  const UserDashboard = () => {
    const userAppointments = appointments.filter(apt => apt.userId === currentUser.id);
    const todayAppointments = userAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
    const thisWeekCount = userAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return aptDate >= today && aptDate <= weekFromNow;
    }).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">lincros Agenda</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Dashboard</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('public-booking')}
                  className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Página Pública
                </button>
                <div className="flex items-center space-x-2">
                  <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hoje</p>
                      <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Esta Semana</p>
                      <p className="text-2xl font-bold text-gray-900">{thisWeekCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total do Mês</p>
                      <p className="text-2xl font-bold text-gray-900">{userAppointments.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BarChart3 className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Taxa Ocupação</p>
                      <p className="text-2xl font-bold text-gray-900">73%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tipos de Reunião */}
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Meus Tipos de Reunião</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Tipo
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {meetingTypes[currentUser.id]?.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`w-3 h-3 rounded-full bg-${meeting.color}-500 mr-2`}></div>
                            <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{meeting.duration} minutos</p>
                          <p className="text-xs text-blue-600">/{meeting.link}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            meeting.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {meeting.active ? 'Ativo' : 'Inativo'}
                          </span>
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Próximos Agendamentos */}
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Próximos Agendamentos</h3>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                      <Settings className="h-4 w-4 mr-1" />
                      Configurar
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {userAppointments.slice(0, 4).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{appointment.clientName}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                          </p>
                          <p className="text-xs text-gray-500">{appointment.type}</p>
                          <p className="text-xs text-blue-600">{appointment.clientEmail}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                          </span>
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Mail className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Integração Microsoft */}
            <div className="mt-8 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Video className="h-5 w-5 mr-2 text-blue-600" />
                  Integração Microsoft
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Microsoft Calendar & Teams</h4>
                    <p className="text-sm text-gray-600">Sincronize com Outlook e crie reuniões automaticamente no Teams</p>
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Conectado como {currentUser.email}
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                    Reconfigurar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // VISÃO PÚBLICA (Para Clientes)
  const PublicBooking = () => {
    const selectedUser = users[selectedUserId];
    const userMeetingTypes = meetingTypes[selectedUserId]?.filter(mt => mt.active) || [];
    
    if (bookingStep === 'success') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Agendamento Confirmado!</h2>
              <p className="text-gray-600">Sua reunião foi agendada com sucesso.</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 text-left border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3 text-center">Detalhes da Reunião</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  {new Date(selectedDate).toLocaleDateString('pt-BR')}
                </p>
                <p className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  {selectedTime} ({selectedMeetingType.duration} min)
                </p>
                <p className="flex items-center text-gray-700">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  {selectedUser.name}
                </p>
                <p className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Confirmação enviada para {clientInfo.email}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetBooking}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Agendar Outra Reunião
              </button>
              <button
                onClick={() => setCurrentView('user-dashboard')}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Ver Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header da página pública */}
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentView('user-dashboard')}
                  className="text-white/80 hover:text-white flex items-center text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Dashboard
                </button>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Página Pública
                </span>
              </div>
              <div className="flex items-center">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="h-20 w-20 rounded-full border-4 border-white/30" />
                <div className="ml-6 text-white">
                  <h1 className="text-3xl font-bold">{selectedUser.name}</h1>
                  <p className="text-blue-100 text-lg">{selectedUser.role}</p>
                  <p className="text-blue-200 text-sm">{selectedUser.company}</p>
                </div>
              </div>
              {selectedUser.bio && (
                <p className="mt-4 text-blue-100 text-sm">{selectedUser.bio}</p>
              )}
            </div>

            <div className="p-8">
              {bookingStep === 'select-meeting' && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">Escolha o tipo de reunião</h3>
                  <div className="grid gap-4">
                    {userMeetingTypes.map((meeting) => (
                      <button
                        key={meeting.id}
                        onClick={() => {
                          setSelectedMeetingType(meeting);
                          setBookingStep('select-date');
                        }}
                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                              {meeting.title}
                            </h4>
                            <p className="text-gray-600 mt-2">{meeting.description}</p>
                            <div className="flex items-center mt-4 text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-2" />
                              {meeting.duration} minutos
                              <Video className="h-4 w-4 ml-4 mr-2" />
                              Microsoft Teams
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full bg-${meeting.color}-500 opacity-60 group-hover:opacity-100`}></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 'select-date' && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setBookingStep('select-meeting')}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{selectedMeetingType.title}</h3>
                      <p className="text-gray-600">{selectedMeetingType.duration} minutos com {selectedUser.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-4">Selecione uma data</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      />
                      {selectedDate && (
                        <button
                          onClick={() => setBookingStep('select-time')}
                          className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                          Ver Horários Disponíveis
                        </button>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Detalhes da Reunião</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 text-blue-600 mr-3" />
                          <span>{selectedMeetingType.duration} minutos</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Video className="h-4 w-4 text-blue-600 mr-3" />
                          <span>Microsoft Teams</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <User className="h-4 w-4 text-blue-600 mr-3" />
                          <span>{selectedUser.name}</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600">{selectedMeetingType.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 'select-time' && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setBookingStep('select-date')}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        Horários disponíveis
                      </h3>
                      <p className="text-gray-600">
                        {new Date(selectedDate).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {(() => {
                    const timeSlots = generateTimeSlots(selectedUserId, selectedDate);
                    return timeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => {
                              setSelectedTime(time);
                              setBookingStep('form');
                            }}
                            className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center font-medium text-gray-700 hover:text-blue-700"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-600 mb-2">Nenhum horário disponível</h4>
                        <p className="text-gray-500">Tente selecionar uma data diferente.</p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {bookingStep === 'form' && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setBookingStep('select-time')}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h3 className="text-2xl font-semibold text-gray-900">Confirme seu agendamento</h3>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-3">Resumo da Reunião</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-blue-800">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(selectedDate).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center text-blue-800">
                        <Clock className="h-4 w-4 mr-2" />
                        {selectedTime} ({selectedMeetingType.duration} min)
                      </div>
                      <div className="flex items-center text-blue-800">
                        <User className="h-4 w-4 mr-2" />
                        {selectedUser.name}
                      </div>
                      <div className="flex items-center text-blue-800">
                        <Video className="h-4 w-4 mr-2" />
                        Microsoft Teams
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem (opcional)
                      </label>
                      <textarea
                        value={clientInfo.message}
                        onChange={(e) => setClientInfo({...clientInfo, message: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Descreva brevemente o assunto da reunião..."
                      />
                    </div>

                    <button
                      onClick={bookAppointment}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg text-lg"
                    >
                      Confirmar Agendamento
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return currentView === 'user-dashboard' ? <UserDashboard /> : <PublicBooking />;
};

export default CalendlyClone;
