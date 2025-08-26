# 🦷 DentCare Pro - Sistema Inteligente para Clínicas Odontológicas

![DentCare Pro](https://img.shields.io/badge/DentCare-Pro-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Sobre o Projeto

O **DentCare Pro** é um sistema completo e inteligente desenvolvido especificamente para clínicas odontológicas, oferecendo uma solução moderna e eficiente para gestão de consultas, pacientes e processos administrativos.

### ✨ Características Principais

- **🎨 Interface Moderna**: Design limpo, leve e elegante
- **📱 Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **🖱️ Drag & Drop**: Reorganize consultas arrastando e soltando
- **🤖 IA Integrada**: Funcionalidades inteligentes para otimização
- **🔒 Seguro**: Sistema de autenticação robusto
- **⚡ Performance**: Carregamento rápido e navegação fluida

## 🚀 Funcionalidades

### 📊 Dashboard Inteligência
- Métricas em tempo real
- Consultas do dia
- Taxa de ocupação
- Receita mensal
- Controle de cancelamentos
- Satisfação dos pacientes

### 📅 Agenda Avançada
- **Visualização semanal** com navegação intuitiva
- **Drag & Drop**: Arraste consultas entre horários
- **Clique em consulta**: Visualizar detalhes completos
- **Clique em horário vazio**: Agendar nova consulta
- **Cores por tipo**: Diferenciação visual por tipo de consulta
- **Filtros e busca**: Encontre rapidamente o que precisa

### 👥 Gestão de Pacientes
- Cadastro completo de pacientes
- Histórico de consultas
- Informações de contato
- Observações médicas

### 💰 Controle Financeiro
- Receitas e despesas
- Relatórios financeiros
- Controle de pagamentos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📦 Instalação Rápida

```bash
# 1. Extrair o projeto
tar -xzf dentcare-pro-completo.tar.gz
cd dentcare-pro

# 2. Instalar dependências
pnpm install

# 3. Executar em desenvolvimento
pnpm run dev

# 4. Acessar no navegador
# http://localhost:5173
```

## 🔑 Credenciais de Acesso

- **Usuário**: `admin`
- **Senha**: `dentcare2025`

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview do build
pnpm run preview

# Linting
pnpm run lint
```

## 🌐 Deploy

### Opções de Hospedagem

1. **Netlify** (Recomendado)
2. **Vercel**
3. **GitHub Pages**
4. **Servidor próprio**

Consulte o manual completo para instruções detalhadas.

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iOS, Android)

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Dashboard+DentCare+Pro)

### Agenda
![Agenda](https://via.placeholder.com/800x400/10b981/ffffff?text=Agenda+Inteligente)

### Modal de Consulta
![Modal](https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Modal+Consulta)

## 📁 Estrutura do Projeto

```
dentcare-pro/
├── public/                 # Arquivos públicos
├── src/                   # Código fonte
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes de UI (shadcn)
│   │   ├── AgendaCalendar.jsx
│   │   ├── ConsultaModal.jsx
│   │   └── NovaConsultaModal.jsx
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos principais
│   └── main.jsx          # Ponto de entrada
├── index.html            # Template HTML
├── package.json          # Dependências e scripts
├── vite.config.js        # Configuração do Vite
├── tailwind.config.js    # Configuração do Tailwind
└── README.md             # Este arquivo
```

## 🔧 Configuração

### Personalização de Cores
Edite `tailwind.config.js` para personalizar o tema:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b'
      }
    }
  }
}
```

### Alteração de Credenciais
Edite `src/App.jsx` na função `handleLogin`:

```javascript
if (loginData.username === 'SEU_USUARIO' && loginData.password === 'SUA_SENHA') {
  setIsLoggedIn(true)
}
```

## 🐛 Solução de Problemas

### Erro ao instalar dependências
```bash
pnpm store prune
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Porta em uso
```bash
pnpm run dev --port 3000
```

## 📈 Roadmap

- [ ] Módulo de Pacientes completo
- [ ] Sistema de Tratamentos
- [ ] Integração com WhatsApp
- [ ] Relatórios avançados
- [ ] App mobile nativo
- [ ] Integração com equipamentos

## 🤝 Contribuição

Este é um projeto personalizado desenvolvido especificamente para sua clínica. Para modificações ou melhorias, entre em contato.

## 📄 Licença

Projeto desenvolvido sob medida. Todos os direitos reservados.

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Consulte o **Manual de Instalação** completo
- Verifique a seção de **Solução de Problemas**
- Entre em contato conforme acordado

---

**Desenvolvido com ❤️ para sua clínica odontológica**

*DentCare Pro v1.0.0 - Sistema Inteligente para Clínicas Odontológicas*

