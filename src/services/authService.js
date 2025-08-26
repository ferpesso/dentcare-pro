// Serviço de Autenticação - DentCare Pro
// Refatoração para separar a lógica de autenticação do componente principal

class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.listeners = [];
  }

  // Método para fazer login
  async login(username, password) {
    try {
      // Simulação de autenticação - em produção, seria uma chamada para API
      if (username === 'ferpesso' && password === 'ferpesso') {
        this.isAuthenticated = true;
        this.user = {
          id: 1,
          username: 'ferpesso',
          name: 'Fernando Pessoa',
          role: 'admin'
        };
        
        // Salvar no localStorage para persistência
        localStorage.setItem('dentcare_auth', JSON.stringify({
          isAuthenticated: true,
          user: this.user,
          timestamp: Date.now()
        }));

        this.notifyListeners();
        return { success: true, user: this.user };
      } else {
        return { success: false, error: 'Credenciais inválidas!' };
      }
    } catch (error) {
      return { success: false, error: 'Erro interno do sistema' };
    }
  }

  // Método para fazer logout
  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('dentcare_auth');
    this.notifyListeners();
  }

  // Verificar se o usuário está autenticado
  checkAuth() {
    try {
      const stored = localStorage.getItem('dentcare_auth');
      if (stored) {
        const authData = JSON.parse(stored);
        const now = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas

        if (authData.isAuthenticated && (now - authData.timestamp) < sessionDuration) {
          this.isAuthenticated = true;
          this.user = authData.user;
          return true;
        } else {
          // Sessão expirada
          this.logout();
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      this.logout();
    }
    return false;
  }

  // Obter dados do usuário atual
  getCurrentUser() {
    return this.user;
  }

  // Verificar se está autenticado
  isLoggedIn() {
    return this.isAuthenticated;
  }

  // Adicionar listener para mudanças de estado
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remover listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notificar todos os listeners sobre mudanças
  notifyListeners() {
    this.listeners.forEach(callback => {
      callback({
        isAuthenticated: this.isAuthenticated,
        user: this.user
      });
    });
  }
}

// Exportar instância singleton
const authService = new AuthService();
export default authService;

