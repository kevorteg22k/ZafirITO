
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Users, TrendingUp, Award, Settings, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserStats {
  total_users: number;
  active_today: number;
  total_xp: number;
  completed_levels: number;
}

interface Level {
  id: string;
  title: string;
  description: string;
  game_type: string;
  xp_reward: number;
  position: number;
  is_active: boolean;
  verse_reference: string;
}

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<UserStats>({
    total_users: 0,
    active_today: 0,
    total_xp: 0,
    completed_levels: 0
  });
  const [levels, setLevels] = useState<Level[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [showLevelForm, setShowLevelForm] = useState(false);

  const [levelForm, setLevelForm] = useState({
    id: '',
    title: '',
    description: '',
    game_type: 'verso-mix',
    xp_reward: 15,
    position: 0,
    verse_reference: ''
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*');
      
      // Fetch levels
      const { data: levelsData } = await supabase
        .from('levels')
        .select('*')
        .order('position');

      // Fetch basic stats
      const { data: progressData } = await supabase
        .from('levels_progress')
        .select('*');

      setUsers(usersData || []);
      setLevels(levelsData || []);
      
      // Calculate stats
      setStats({
        total_users: usersData?.length || 0,
        active_today: usersData?.filter(u => {
          const today = new Date().toDateString();
          const userDate = new Date(u.updated_at).toDateString();
          return today === userDate;
        }).length || 0,
        total_xp: progressData?.reduce((sum, p) => sum + (p.score || 0), 0) || 0,
        completed_levels: progressData?.filter(p => p.completed).length || 0
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingLevel) {
        // Update existing level
        const { error } = await supabase
          .from('levels')
          .update(levelForm)
          .eq('id', editingLevel.id);
        
        if (error) throw error;
        
        toast({
          title: "Nivel actualizado",
          description: "El nivel se ha actualizado correctamente",
        });
      } else {
        // Create new level
        const { error } = await supabase
          .from('levels')
          .insert([levelForm]);
        
        if (error) throw error;
        
        toast({
          title: "Nivel creado",
          description: "El nuevo nivel se ha creado correctamente",
        });
      }
      
      await fetchAdminData();
      setShowLevelForm(false);
      setEditingLevel(null);
      resetLevelForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteLevel = async (levelId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este nivel?')) return;
    
    try {
      const { error } = await supabase
        .from('levels')
        .delete()
        .eq('id', levelId);
      
      if (error) throw error;
      
      await fetchAdminData();
      toast({
        title: "Nivel eliminado",
        description: "El nivel se ha eliminado correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const toggleLevelActive = async (level: Level) => {
    try {
      const { error } = await supabase
        .from('levels')
        .update({ is_active: !level.is_active })
        .eq('id', level.id);
      
      if (error) throw error;
      
      await fetchAdminData();
      toast({
        title: "Estado actualizado",
        description: `Nivel ${!level.is_active ? 'activado' : 'desactivado'} correctamente`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetLevelForm = () => {
    setLevelForm({
      id: '',
      title: '',
      description: '',
      game_type: 'verso-mix',
      xp_reward: 15,
      position: levels.length,
      verse_reference: ''
    });
  };

  const startEditLevel = (level: Level) => {
    setEditingLevel(level);
    setLevelForm({
      id: level.id,
      title: level.title,
      description: level.description || '',
      game_type: level.game_type,
      xp_reward: level.xp_reward,
      position: level.position,
      verse_reference: level.verse_reference || ''
    });
    setShowLevelForm(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-400">Dashboard Administrador</h1>
            <p className="text-gray-400">Bienvenido, {user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Usuarios</p>
                <p className="text-2xl font-bold">{stats.total_users}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Activos Hoy</p>
                <p className="text-2xl font-bold">{stats.active_today}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">XP Total</p>
                <p className="text-2xl font-bold">{stats.total_xp}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Niveles Completados</p>
                <p className="text-2xl font-bold">{stats.completed_levels}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Levels Management */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Gestión de Niveles</h2>
            <button
              onClick={() => {
                resetLevelForm();
                setShowLevelForm(true);
                setEditingLevel(null);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Nivel</span>
            </button>
          </div>

          {showLevelForm && (
            <div className="mb-6 p-4 bg-slate-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {editingLevel ? 'Editar Nivel' : 'Crear Nuevo Nivel'}
              </h3>
              <form onSubmit={handleSaveLevel} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ID del nivel"
                  value={levelForm.id}
                  onChange={(e) => setLevelForm({ ...levelForm, id: e.target.value })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                  required
                  disabled={!!editingLevel}
                />
                <input
                  type="text"
                  placeholder="Título"
                  value={levelForm.title}
                  onChange={(e) => setLevelForm({ ...levelForm, title: e.target.value })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  value={levelForm.description}
                  onChange={(e) => setLevelForm({ ...levelForm, description: e.target.value })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                />
                <select
                  value={levelForm.game_type}
                  onChange={(e) => setLevelForm({ ...levelForm, game_type: e.target.value })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                >
                  <option value="verso-mix">Verso Mix</option>
                  <option value="emojiverso">Emojiverso</option>
                  <option value="relleno-divino">Relleno Divino</option>
                  <option value="verso-completo">Verso Completo</option>
                </select>
                <input
                  type="number"
                  placeholder="XP Reward"
                  value={levelForm.xp_reward}
                  onChange={(e) => setLevelForm({ ...levelForm, xp_reward: parseInt(e.target.value) })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                  required
                />
                <input
                  type="number"
                  placeholder="Posición"
                  value={levelForm.position}
                  onChange={(e) => setLevelForm({ ...levelForm, position: parseInt(e.target.value) })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Referencia bíblica"
                  value={levelForm.verse_reference}
                  onChange={(e) => setLevelForm({ ...levelForm, verse_reference: e.target.value })}
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
                />
                <div className="md:col-span-2 flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                  >
                    {editingLevel ? 'Actualizar' : 'Crear'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLevelForm(false);
                      setEditingLevel(null);
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">Título</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">XP</th>
                  <th className="text-left py-2">Posición</th>
                  <th className="text-left py-2">Estado</th>
                  <th className="text-left py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level) => (
                  <tr key={level.id} className="border-b border-slate-700">
                    <td className="py-2">{level.id}</td>
                    <td className="py-2">{level.title}</td>
                    <td className="py-2">{level.game_type}</td>
                    <td className="py-2">{level.xp_reward}</td>
                    <td className="py-2">{level.position}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        level.is_active 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {level.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditLevel(level)}
                          className="p-1 text-blue-400 hover:text-blue-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleLevelActive(level)}
                          className="p-1 text-yellow-400 hover:text-yellow-300"
                        >
                          {level.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteLevel(level.id)}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Usuarios Registrados</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Nombre</th>
                  <th className="text-left py-2">Rol</th>
                  <th className="text-left py-2">Fecha Registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700">
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.full_name || 'Sin nombre'}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'admin' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
